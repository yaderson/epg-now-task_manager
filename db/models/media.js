const mongoose = require("mongoose")

const MediaSchema = new mongoose.Schema({
    id: {type: String},
    backdrop_path: {type: String},
    poster_path: {type: String},
    imdb_id: { type: String, default: null },//MOVIE
    adult: {type: Boolean, default: null},//MOVIE
    title: {type: String, default: null},//MOVIE
    original_title: {type: String, default: null},//MOVIE
    name: {type: String, default: null}, //TV
    original_name: {type: String, default: null}, //TV
    overview: {type: String},
    production_companies: [{ id: {type: String}, logo_path: {type: String}, name: {type: String}, origin_country: {type: String} }],//TV
    genres: [
        {
        id: {type: String},
        name: {type: String}
        }
    ],
    seasons: [{ //TV
        air_date: {type: String}, 
        episode_count: {type: String}, 
        id: {type: String}, 
        name: {type: String}, 
        overview: {type: String}, 
        poster_path: {type: String}, 
        season_number: {type: String}
    }],
    release_date: {type: Date, default: null}, //MOVIE
    first_air_date: {type: Date, default: null}, //TV
    last_air_date: {type: Date, default: null},//TV
    number_of_episodes: {type: Number, default: null},//TV
    number_of_seasons: {type: Number, default: null},//TV
    created_by: [{
        id: {type: String},
        credit_id: {type: String},
        name: {type: String},
        gender: {type: String},
        profile_path: {type: String},
    }],//TV
    networks: [{ //TV
        name: {type: String},
        id: {type: String},
        logo_path: {type: String},
        origin_country: {type: String}
    }],
    vote_average: {type: Number},
    imdb_rating: {type: Number, default: null},
    media_type: {type: String},
    runtime: { type: Number },//MOVIE
    episode_run_time: {type: Array},
    event_called: {type: String}
})
/**
* @typedef Media
*/
module.exports = mongoose.model('Media', MediaSchema)