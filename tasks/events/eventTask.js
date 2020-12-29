const { fetchDataFromOrigin, searchTMDB, getTMDB } = require('./services/fetch.js')
const { insertAll } = require('./services/events')
const { saveMedia, getByTitle } = require('./services/media')
const fetch = require('node-fetch');

const url_base = 'https://api.themoviedb.org/3';
const api_key = process.env.TMDB_KEY;


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let tmdb_fetchs, found_db, found_tmdb //Acum report

async function getMedia(event) {

    //find in media collection
    const mediaCollectionSearch = await getByTitle(event.name)
    if(mediaCollectionSearch) {
        found_db++
        return mediaCollectionSearch
    }

    if((event.ext_year != "" && event.ext_year != null) && (event.dvb_content!="" && event.dvb_content!=null)){
        console.log('Have year...')

        const searchResults = await searchTMDB(event.name)
        tmdb_fetchs++
        console.log('Res #: ',searchResults.results.length)

        if(searchResults.results.length > 0){

            const matchTMDB = searchResults.results.filter((result) => { // Matching date year
                if(result.release_date){
                    if(result.release_date.split('-')[0] == event.ext_year){
                        console.log('Have mathc...')
                        return result //Return match
                    }
                }else {
                    if(result.first_air_date){
                        if(result.first_air_date.split('-')[0] == event.ext_year){
                            console.log('Have mathc...')
                            return result //Return match
                        }
                    }
                }
            })
            
            if(matchTMDB[0]){
                let mediaResult = await (await fetch(`${url_base}/${matchTMDB[0].media_type}/${matchTMDB[0].id}?api_key=${api_key}&language=es-ES`)).json()
                tmdb_fetchs++
                if(mediaResult){
                    found_tmdb++
                    mediaResult.media_type =  matchTMDB[0].media_type
                    mediaResult.event_called = event.name
                    const saved = await saveMedia(mediaResult)

                    console.log(`For event << ${event.name} >> encountered :)`)
                    console.log(mediaResult.title, mediaResult.release_date)

                    return saved
                }

            }else {
                console.log('No Match')
            }
        }else {
            console.warn('No have results')
            //await timeout(2000)
        }
    }
    console.log('Finish...')
}


async function saveEvents(){

    tmdb_fetchs = 0, found_db = 0, found_tmdb = 0

    console.log('+++ Fetch Events from origin...')
    
    const channels = await fetchDataFromOrigin()

    console.log('+++ Fetched...')

    let eventsAll = []
    let lastprogramed = new Date()

    if(channels.length > 0){
        await channels.forEach(async(element) => {
            await element.events.forEach(async(event) => {
                await eventsAll.push({
                    channel_id: event.channel_id,
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    talent: event.talent,
                    date_begin: event.date_begin,
                    date_end: event.date_end,
                    ext_eventimage_name_base: event.ext_eventimage_name_base,
                    ext_year: event.ext_year,
                    ext_original_name: event.ext_original_name,
                    dvb_content: event.dvb_content,
                    tmdb_id: null,
                    tmdb_media_type: null
                })
            })
        })
        
        console.log(`#### START: ${eventsAll.length}`)
        for (let i = 0; i < eventsAll.length; i++) {
            console.log(`[${i}] process: ${eventsAll[i].name}`)
            const match = await getMedia(eventsAll[i])

            if(match){
                eventsAll[i].tmdb_id = match._id
                eventsAll[i].tmdb_media_type = match.media_type
                console.log('Match saved on array',eventsAll[i].tmdb_id)
                console.log('Time out')
                await timeout(1000)
            }
        }
    
        console.log(`=== ${eventsAll.length} Events Maped...`)
        const savedEvents = await insertAll(eventsAll)
        console.log(`=== ${savedEvents.length} Events was Saved successful!!`)
        
        return {
            total: savedEvents.length,
            tmdb_fetchs,
            found_db,
            found_tmdb
        }
    }else {
        return new Error('Error epg no found')
    }
    
}

module.exports = {
    saveEvents
}