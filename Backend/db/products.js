const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userID:String,
    Company:String
})

module.exports=mongoose.model('products',productSchema)