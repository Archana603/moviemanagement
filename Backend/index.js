//1.importing
const express = require("express");
const movieModel = require("./model/movieDb");
const cors = require('cors');
//2.ini
const app = new express;

//3.middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
//Api creation
//to post data
app.post('/add',async(req,res)=>{
    console.log(req.body)
    var data = await movieModel(req.body);
    data.save();
    res.send({status:"data saved"})
})

//to view
app.get('/view',async(req,res)=>{
    var data = await movieModel.find();
    res.json(data);
})

//delete
app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params)
    let id =req.params.id;
    await movieModel.findByIdAndDelete(id);
    res.json({status:"deleted"})
})

//to update
app.put('/edit/:id',async(req,res)=>{
    let id = req.params.id
    try{
        var data = await movieModel.findByIdAndUpdate(id,req.body)
        res.json({status:"updated"})
    }
    catch(err){
        res.status(500).send(err)
    }
})

//port
app.listen(3008,()=>{
    console.log("app is running in port 3008")
})