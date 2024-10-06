const express=require("express");
const app=express()
const {connectToDb,getDb}=require("./mongoServer")
const cors=require("cors");
const PORT=5000;
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:"Content-type"
}))

let dataBase;

connectToDb((err)=>{
    if(!err){
        app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
    }
    dataBase=getDb()
})


app.get('/notes',(req,res)=>{
    const Notes=[]
    dataBase.collection("notes").find()
    .forEach(note=>Notes.push(note))
    .then(()=>res.status(200).json(Notes))
    .catch(()=>res.status(500).json({"msg":"could not found this database"}))
})

app.post('/notes',(req,res)=>{
    const Body=req.body;
    dataBase.collection("notes")
    .insertOne(Body)
    .then((stat)=>res.status(201).json(stat))
    .catch(()=>res.status(500).json({"msg":"could not added"}))
})

app.delete('/notes/:id',(req,res)=>{
    const Id= +req.params.id;
    dataBase.collection("notes")
    .deleteOne({id:Id})
    .then((stat)=>res.status(201).json(stat))
    .catch(()=>res.status(500).json({"msg":"could not deleted"}))
})

app.patch('/notes/:id',(req,res)=>{
    const Id= +req.params.id;
    const Body=req.body;
    dataBase.collection("notes")
    .updateOne({id:Id},{$set:Body})
    .then((stat)=>res.status(200).json(stat))
    .catch(()=>res.status(500).json({"msg":"could not updated"}))
}
)