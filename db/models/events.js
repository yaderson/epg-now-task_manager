const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({
    channel_id: {type: String},
    id: {type: String},
    name: {type: String},
    description: {type: String},
    talent: {type: String},
    date_begin: {type: Date},
    date_end: {type: Date},
    ext_eventimage_name_base: {type: String},
    ext_year: {type: String},
    ext_original_name: {type: String},
    dvb_content: {type: String},
    tmdb_id: {type: mongoose.Schema.Types.ObjectId, default: null},
    tmdb_media_type: {type: String, default: null}
}, {  toJSON: { virtuals: true }, toObject: { virtuals: true } })

EventSchema.virtual('tmdb_media', {
    ref: 'Media', // The model to use
    localField: 'tmdb_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
});
EventSchema.virtual('channel', {
    ref: 'Channel', // The model to use
    localField: 'channel_id', // Find people where `localField`
    foreignField: 'id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
});

/**
* @typedef Event
*/
module.exports = mongoose.model('Event', EventSchema)