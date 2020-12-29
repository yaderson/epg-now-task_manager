const TaskContol = require("../db/models/task_contol")

module.exports = {
    async getLasReport() {
        const results = await TaskContol.findOne({$orderby:{finish_date: 1}}).explain()
        return results
    },
    async newReport(report) {
        const newReport = new TaskContol(report)
        const savedReport = await newReport.save()
        return savedReport
    }
}