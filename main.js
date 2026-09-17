import express, { response } from 'express'
import moment from 'moment'

const app = express()
const now = moment()
const HOST = '127.0.0.1'
const PORT = 3000

const products = [
    {
        id: '0',
        name: 'Keyboard',
        price: 67,
        category: 'electronic'
    },
    {
        id: '1',
        name: 'Apple',
        price: 2,
        category: 'fruit'
    },
    {
        id: '2',
        name: 'PC',
        price: 1292,
        category: 'electronic'
    },
    {
        id: '3',
        name: 'Lamp',
        price: 12,
        category: 'furniture'
    },
    {
        id: '4',
        name: 'Laptop',
        price: 980,
        category: 'electronic'
    },
]


app.get("/timestamp", (req, res)=>{
    return res.json({
        "date": now.format("L"),
        "time": now.format("LT"),
        "dayOfWeek": now.format("dddd")
    })
    
})

app.get('/products', (req, res)=>{
    const {category, take: takeReq} =req.query
    const take = parseInt(takeReq)  
    let productsRes= products

     if (takeReq && (!Number.isInteger(take) || take <= 0)) {
        return res.status(400).json('Wrong take');
    }
    if( category){
        productsRes = productsRes.filter(product => (product.category == category))
    }
    
    if (take){
        productsRes = productsRes.splice(0, take)
    }

    return res.status(200).json(productsRes)
})

app.get('/products/:id', (req, res)=>{
    const {id} = req.params
    const product = products.find(product => (product.id== id))
    return res.status(200).json(product)
})

app.listen(PORT, HOST,()=> {
    console.log(`http://${HOST}:${PORT}/`)
})