const fetch = require('node-fetch');
const api_url = process.env.API_ORIGIN_URL
const url_base = 'https://api.themoviedb.org/3';
const api_key =  process.env.TMDB_KEY;

function getDate(date) {
    let Timeopt = {hour12:false, hour:"2-digit",minute:"2-digit", second:"2-digit"}
    let Dateopt = {day:"2-digit", month:"2-digit", year:"numeric"}

    let dateStrig = date.toLocaleDateString("es-ES", Dateopt).split('/')
    let timeString = date.toLocaleTimeString("es-ES", Timeopt).split(':')
    console.log(dateStrig, timeString)
    return (`${dateStrig[2]}${dateStrig[1]}${dateStrig[0]}${timeString[0]}${timeString[1]}${timeString[2]}`)
}

async function getEpg(from, to){
    console.log(`fetch from: ${from} | to: ${to}`)
    const res = await(await fetch(`${api_url}&date_from=${from}&date_to=${to}`)).json()
    
    return res.response.channels
}

async function fetchDataFromOrigin(from, to, days) {

    let lastToEventFetch = to
    
    let channels = []
    
    const res = await fetch(`${api_url}&date_from=${getDate(new Date(from))}&date_to=${getDate(to)}`)
    const epg = await res.json()

    channels = epg.response.channels

    
    let moreFrom = new Date(to).getTime(), moreTo
    if(days > 0) {        
        for(let i=0; i<days; i++) {
            moreTo = new Date(moreFrom+(24*60)*60*1000)
            console.log('More channels adding: ', new Date(moreFrom).toLocaleString(), new Date(moreTo).toLocaleString());

            const resM = await fetch(`${api_url}&date_from=${getDate(new Date(moreFrom))}&date_to=${getDate(moreTo)}`)
            const epgM = await resM.json()

            
             //Delete firs event 

            for(let a=0; a < epgM.response.channels.length; a++){
                let moreEvents = epgM.response.channels[a].events
                moreEvents.shift()
                channels[a].events.push(...moreEvents) //Spread on finish date events
            }
            console.log('============= finish ===========');
            moreFrom = moreTo.getTime()
            lastToEventFetch = moreTo
        }
    }
    if(days === 0) channels.shift()
	return {
        channels,
        lastToEventFetch
    }
}

async function searchTMDB(name){
    const res = await(await fetch(`${url_base}/search/multi?api_key=${api_key}&language=es-ES&query=${encodeURI(name)}&page=1`)).json()
    return res
}

async function getTMDB(id, mediaType){
    const res = await(await fetch(`${url_base}/${mediaType}/${id}?api_key=${api_key}&language=es-ES`)).json()
    return res
}

module.exports = {
    fetchDataFromOrigin,
    searchTMDB,
    getTMDB
}
