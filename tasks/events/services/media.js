'use strict'

const Media =  require('../../../db/models/media')

async function saveMedia(media){
    const exist = await Media.findOne({ id: media.id , media_type: media.media_type})
    if(!exist){
        const newMedia = new Media(media)
        const saved = await newMedia.save()
        return saved 
    }
    return exist
}

async function getByTitle(title){
    const media = await Media.findOne({event_called: title})
    return media
}

module.exports = {
    saveMedia,
    getByTitle
}