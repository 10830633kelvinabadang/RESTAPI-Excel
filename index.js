const express = require("express");
const multer=require("multer");
const exceltojson=require("convert-excel-to-json");
const fs=require("fs-extra");


const PORT = process.env.PORT || 3030;
const app= express();


var upload = multer({dest: "uploads/"})


app.post("/read", upload.single("file"),(req,res)=>{
    try {
       
        if (req.file?.filename==null || req.file?.filename=='undefined') {
            res.status(400).json("No such file")
        } else {
            
            var filepath = 'uploads/'+ req.file.filename;

            const exceldata= exceltojson({
                sourceFile:filepath,
                header:{
                    rows:1
                },
                columnToKey:{
                    '*': '{{columnHeader}}',
                },
            });
            
            fs.remove(filepath)
            console.log(exceldata)
            res.status(200).json(exceldata)
        }
    } catch (error) {
      res.status(500)  
    }
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
 });
