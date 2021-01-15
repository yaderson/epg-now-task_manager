const messager = require("../../messager")
const { timeDuration } = require("../../utils")
const { newReport } = require("../../utils/task")
const { saveEvents } = require("./eventTask")


module.exports = async function (data) {
    const { started_date, days, last_to_event_fetch } = data

    console.log('Handing task events ...')
    await messager(`\u{1F3C1} The task/events was started successful`)
    let report = {
        started_date: started_date,
        finish_date: null,
        number_events: null,
        found_db: null,
        found_tmdb: null,
        number_events_with_media: null,
        number_tmdb_fetch: null,
        total_time: null,
        log_data: null
    }

    
    const final = await saveEvents(days||0, last_to_event_fetch)
    const finish_date = new Date()


    report.total_time = timeDuration(new Date(started_date), finish_date)
    report.finish_date = finish_date
    report.number_events = final.total
    report.found_db = final.found_db
    report.found_tmdb = final.found_tmdb
    report.number_events_with_media = final.found_db+final.found_tmdb
    report.number_tmdb_fetch = final.tmdb_fetchs
    report.last_to_event_fetch = final.lastToEventFetch
    report.succes = true


    await newReport(report)
    await messager(`\u{1F7E2} The task/events was ende successful`)
    


    const finalMessage = `
\u{1F680} *started_date:* ${new Date(report.started_date).toLocaleString('es-ES')}
\u{1F51A} *finish_date:* ${report.finish_date.toLocaleString('es-ES')}
\u{1F39F} *number_events:* ${report.number_events}
\u{1F39E} *number_tmdb_fetch:* ${report.number_tmdb_fetch}
\u{231B} *total_time:* ${report.total_time}`

    await messager(finalMessage)
}
