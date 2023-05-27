const express=require('express');
require('./db/config');
const cors=require('cors')
const User=require("./db/Users")
const Product=require("./db/products")
const app=express();
const Jwt = require('jsonwebtoken');
const jwtKey="e-comm";
app.use(express.json())
app.use(cors())

app.post("/register",async(req,res)=>{
    let user=new User(req.body);
    let result= await user.save();
    result=result.toObject();
    delete result.password
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send("Something went wrong, please try after sometime")
        }
        res.send({user,auth:token})
    })
})

app.post('/login',async (req,res)=>{
    console.log(req.body);
    if(req.body.password && req.body.email){
    let user=await User.findOne(req.body).select("-password")
    if(user){
        Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.send("Something went wrong, please try after sometime")
            }
            res.send({user,auth:token})
        })
    }else{
        res.send({result:'User not found'})
    }
    }else{
        res.send({result:'User not found'})
    }
})

app.post('/add-product',async(req,res)=>{
  let product=new Product(req.body);
  let result=await product.save();
  res.send(result)  
})
app.get('/products', async (req,res)=>{
    let products =await Product.find();
    if (products.length>0){
        res.send(products)
    }else(
        res.send({result:'No Product Found'})
    )
})

app.delete('/products/:id', async(req,res)=>{
    const result=await  Product.deleteOne({_id: req.params.id})
    res.send(result)
})

app.get('/product/:id',async(req,res)=>{
    let result=await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result:"no record found"})
    }
})

app.put("/product/:id",async(req,res)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result)
})

app.get('/search/:key',async(req,res)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}}

        ]
    })
    res.send(result)
})
app.listen(5000)