const express = require("express")
const { exec } = require("child_process")
const app = express()
app.get("/index",(req,res)=>{
            res.sendFile(__dirname + "/form.html")
})
app.get("/output", (req,res)=>{
    const cname = req.query.cname;
    const img = req.query.img;
    exec("docker run -dit --name  " + cname + " " + img,(err,stdout,stderr)=>{
        res.send("<pre>" + stdout + "</pre>" ); 
	})
})

app.get("/info", (req,res)=>{
    exec("docker ps ",(err,stdout,stderr)=>{
        res.send( "<pre>" + stdout + "<pre>");
    })
})

app.get("/inspect", (req,res)=>{
        res.sendFile(__dirname + "/inspect.html")

})

app.get("/iinfo", (req,res)=>{
    cname=req.query.iname;
    exec("docker inspect " + " " + cname,(err,stdout,stderr)=>{
        res.send( "<pre>" + stdout + "<pre>");
            console.log(cname);
    })
})


app.listen(3000,()=>{
    console.log("server started...")
})

