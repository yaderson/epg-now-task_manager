const Event = require('../../../db/models/events')

/**
* 
* @param {array} newEvents - Array of new Events 
* @returns {array} - Array of new Events saved
*/
async function insertAll(newEvents) {
    const events = await Event.insertMany(newEvents)
    return events
}

module.exports = {
    insertAll
}