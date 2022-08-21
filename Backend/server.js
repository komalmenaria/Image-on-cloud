const express = require("express");
const app = express();
const { cloudinary } = require("./Utiles/cloudinary.js");
const con= require('./db/conn')
const Gallery=require('./db/gallery')
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.get('/api/images' , async(req,res)=>{
   try {
    let galleryImages=await Gallery.find()
    //you can use mongodb order by with createdAt key
    // just open db folder and try to understand the concepts 
    res.send({status:true,message:"success",data:galleryImages});
   } catch (error) {
    res.status(500).json({status:false,message:error.message})
   }
  
})


app.post('/api/upload', async (req, res) => {
    try {
       
        // dont use const while extrating from req
        let {base64EncodedImage} = req.body;
            
        const uploadResponse = await cloudinary.uploader.upload(base64EncodedImage, {
            upload_preset: 'dev_setups',
        });
        // you have to store private url in database while uploading the file 
        // so for that im going to use mongoDb and will store the images with id and private url
        let imageInsertedInDb=    await Gallery.create({
            images:{public_id:uploadResponse.public_id,
                url:uploadResponse.url}
                
        })
        if(!imageInsertedInDb){
            res.send({status:false,message:"Failed to Inset In db"})
        }


        //  always send response in formate of 
        // use this for success case  res.json({staus:true,message:"success",data:{} })
        //use this for error or any false condition res.json({status:false,message:"Invalid Userr"})
  
        res.send({staus:true,message:"success",data:uploadResponse })
    } catch (err) {
        console.error(err);
        res.status(500).json({status:false,message:err.message})
  
       
    }
});





con(); //connecting database 
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port  ${port}`);
});


// try to learn docker it will help you in any kind of deployment task for react/node or any tech stack
