import express, { response } from 'express'
import moment from 'moment'

const app = express()
app.use(express.json())
const now = moment()
const HOST = '127.0.0.1'
const PORT = 3000

let products = [
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

async function addProduct(product, isFail) {
    return new Promise((resolve, reject)=>{
        if (isFail){
           reject()
        }
        products = [...products, product]
        resolve(products)
    })
}


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
    let productsRes= [...products]

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

    if (id<0, !Number.isInteger(id)){
        return res.status(400).json("Wrong id")
    }

    const product = products.find(product => (product.id== id))

    if (!product){
        return res.status(404).json("There is no product with this id")
    }

    return res.status(200).json(product)
})

app.post("/products", async (req, res)=> {
    const {fail} = req.query
    const {name, price, category} = req.body
    const {image} =req.body ?? ''

    if (typeof name !== 'string' || !Number.isInteger(price) || typeof category !== 'string' || !name.trim() || price<0 || !category.trim()){
        return res.status(422).json("Invalid product data")
    }

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price,
        category: category,
        image: image
    }

    try{
        if (products.find(product => (product.name== name))){
            return res.status(409).json('Conflict. Product with this name already exist')
        }
        const result = await addProduct(newProduct, fail)
        return res.status(201).json(result)
    } catch(error){
        console.log(erorr)
        return res.status(500).json("Server`s problem")
    }
})


app.listen(PORT, HOST,()=> {
    console.log(`http://${HOST}:${PORT}/`)
})