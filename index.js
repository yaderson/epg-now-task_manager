'use strict'
require('dotenv').config()
const Redis = require('ioredis')
const db = require('./db')
const messager = require('./messager')
const  { events } = require('./tasks')

const REDIS_SERVER = process.env.REDIS_SERVER
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

const redis = new Redis(REDIS_SERVER,{
    password: REDIS_PASSWORD
})

const SUB_Cannels = ['task/events','task/channels','task/media','task/message']


db.startDB().then(() => {
    redis.subscribe(SUB_Cannels) // event, channels, media
    
    redis.on("message", async (channel, message) => {
        // Manage all received message form subscibed channels
    
        try {
            const data = JSON.parse(message)
            
            switch (channel){
                case SUB_Cannels[0]:
                    events(data)
                    break
                case SUB_Cannels[3]:
                    await messager(data.message)
                    break
            }
        }catch (error) {
            console.log(error)
            try {
                await messager(`\u{1F534} The task/events was ende unsuccessful`)
                await messager(`${"`"+error+"`"}`)
            } catch (error) {
                console.error(error)
            } 
        }
    });

})
.catch((err) => {
    console.log(err)
    process.exit(0)
})
