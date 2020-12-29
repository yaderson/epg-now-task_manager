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


async function fetchDataFromOrigin(){
    let now = new Date()

    let from = getDate(now)
    now.setHours((now.getHours()+12))
    let to = getDate(now)
    console.log(from, to)
    const channels = await getEpg(from, to)
    return channels
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