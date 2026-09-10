import express from 'express'
import moment from 'moment'

const app = express()
const now = moment()
const HOST = '127.0.0.1'
const PORT = 3000

app.get("/timestamp", (req, res)=>{
    res.json({
        "date": now.format("L"),
        "time": now.format("LT"),
        "dayOfWeek": now.format("dddd")
    })
    
})

app.listen(PORT, ()=> {
    console.log(`http://${HOST}:${PORT}/timestamp`)
})