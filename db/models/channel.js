const mongoose = require("mongoose")


const ChannelSchema = new mongoose.Schema({
    id: {type: String},
    number: {type: String},
    name: {type: String},
    hd: {type: Boolean},
    group_id: {type: String},
    title_uri: {type: String},
    title_original: {type: String},
    media: {
        image: { type: String},
        image_base_horizontal: { type: String },
        backgroundPhoto: { type: String }
    },
}, {  toJSON: { virtuals: true }, toObject: { virtuals: true } })


ChannelSchema.virtual('events', {
    ref: 'Event', // The model to use
    localField: 'id', // Find people where `localField`
    foreignField: 'channel_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
});
/**
* @typedef Channel
*/
module.exports = mongoose.model('Channel', ChannelSchema)