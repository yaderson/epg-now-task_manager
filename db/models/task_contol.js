const mongoose = require("mongoose")

const TaskControlSchema = new mongoose.Schema({
    started_date: {type: Date},
    finish_date: {type: Date},
    number_events: {type: Number},
    number_events_with_media: {type: Number},
    number_tmdb_fetch: {type: Number},
    total_time: {type: String},
    found_db: {type: Number},
    found_tmdb: {type: Number},
    log_data: {type:String},
    created_at: {type: Date, default: new Date()},
    succes: {type: Boolean}
})
/**
* @typedef TaskContol
*/
module.exports = mongoose.model('taks_control', TaskControlSchema)