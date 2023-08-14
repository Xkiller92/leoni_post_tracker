const username = "a"
const pwd = "a"

const blockedResources = ["/home.html", "/specs.html", "/monitoring.html", "workstations.html"]

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const auth = function (req, res, next) {
  a = 0;
  blockedResources.forEach(element => {
    if(element == req.originalUrl){
      if (req.cookies.token == "1234") {
        next()
        a = 1;
      }
      else{
        res.sendStatus(403)
      }
    }
  });
  
  if(a == 0){
    next()
  }
}

app.use(auth)
app.use(express.static("interface"));
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/swagger/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const pgp = require('pg-promise')()

const cn = {
  host: 'containers-us-west-119.railway.app',
  port: 7563,
  database: 'railway',
  user: 'postgres',
  password: 'UQaF6tnrjjAtfDHFoxqa'
}

const db = pgp(cn)



app.post('/collect/workstation', (req, res) => {
workstationData = JSON.parse(JSON.stringify(req.body))

date = new Date().getUTCMonth() + "/" + new Date().getUTCDate()  + "/" +new Date().getUTCFullYear();

console.log(date)

db.any('select * from workstation_data where workstation_id = $1',[workstationData.name])
.then(function(data){
  console.log(data)

  if(data.length != 0){
    console.log(1)
    db.any('update workstation_data set total_disk_space = $1, free_disk_space = $2, ram_capacity = $3, entry_date = $4 where workstation_id = $5',
    [workstationData.totalDiskSpace,workstationData.freeDiskSpace,workstationData.ramCapacity, date, workstationData.name])

    
  }
  else{
  console.log(2)

  db.any('insert into workstation_data values($1,$2,$3,$4,$5)',
  [workstationData.name, workstationData.totalDiskSpace,workstationData.freeDiskSpace,workstationData.ramCapacity, date])
  }

  res.send('nice')
})
})


app.post('/collect/specs', (req, res) =>{
  SpecsData = JSON.parse(JSON.stringify(req.body))

  db.any('select * from specs where spec_number = $1',[SpecsData.name])
  .then(function(data){


    if(data.length != 0){

      db.any('update specs set spec_name = $1, total_disk_space = $2, free_disk_space = $3, ram_capacity = $4, expiree_date = $5 where spec_number = $6',
      [SpecsData.name,SpecsData.totalDiskSpace,SpecsData.freeDiskSpace,SpecsData.ramCapacity,date,SpecsData.number])

      
    }
    else{
    console.log(2)

    db.any('insert into specs values($1,$2,$3,$4,$5,$6)',
    [SpecsData.number,SpecsData.name,SpecsData.totalDiskSpace,SpecsData.freeDiskSpace,SpecsData.ramCapacity, date])
    }
  })
})

app.get('/data/specs', (req, res) =>{
  
  db.any('select * from specs')
  .then(function(data){
    res.send(data)
  })

})

app.post('/data/spec/id', (req, res) =>{
  SpecsData = JSON.parse(JSON.stringify(req.body))
  db.any('select spec_number from workstation_lookup where workstation_id = $1',[SpecsData.id])
  .then(function(data){
    db.any("select * from specs where spec_number = $1", [data[0].spec_number]).then(function(dataa){
      res.send(dataa)
    })
  })

})

app.post('/update/spec', (req, res) =>{
  SpecsData = JSON.parse(JSON.stringify(req.body))
  db.any('update specs set spec_name = $1, total_disk_space = $2, free_disk_space = $3, ram_capacity = $4, expiree_date = $5 where spec_number = $6',
    [SpecsData.name,SpecsData.totalDiskSpace,SpecsData.freeDiskSpace,SpecsData.ramCapacity,SpecsData.afkTime,SpecsData.number])
  res.send('nice')
})

app.post('/delete/spec', (req, res) =>{
  SpecsData = JSON.parse(JSON.stringify(req.body))
  db.any('delete from specs where spec_number = $1',[SpecsData.number])
  res.send('nice')
})

app.get('/data/workstations', (req, res) =>{
  db.any('select * from workstation_data')
  .then(function(data){
    res.send(data)
  })
})



app.post('/data/workstation/id', (req, res) =>{
  SpecsData = JSON.parse(JSON.stringify(req.body))
  db.any('select * from workstation_data where workstation_id = $1',[SpecsData.id])
  .then(function(data){
    res.send(data)
  })
})

app.get("/data/pairs", (req, res)=>{
  db.any("select * from workstation_lookup").then(function(data){
    res.send(data)
  })
})

app.post("/collect/pair", (req, res) =>{
  data = JSON.parse(JSON.stringify(req.body)) 
  db.any("insert into workstation_lookup values($1, $2)", [data.specName, data.workstationId])
})

app.post("/modify/pair", (req, res) =>{
  data = JSON.parse(JSON.stringify(req.body)) 
  console.log(data)
  db.any("update workstation_lookup set spec_number = $1, workstation_id = $2 where spec_number = $1 and workstation_id = $2", [data.specName, data.workstationId])
})

app.post("/delete/pair", (req, res) =>{
  data = JSON.parse(JSON.stringify(req.body)) 
  db.any("delete from workstation_lookup where spec_number = $1 and workstation_id = $2", [data.specName, data.workstationId])
})


app.get("/data/monitoring", (req, res)=>{
  const corruptedWSS = []


  db.any("select * from workstation_data").then(async function(data){
    await Promise.all(data.map(async function(element){
      await db.any("select * from workstation_lookup where workstation_id = $1", [element.workstation_id]).then(async function(dataa){
        await db.any("select * from specs where spec_number = $1", [dataa[0].spec_number]).then(function(adata){
          //compare the spec to the current ws info
          corrupted = false;
          
          if (element.total_disk_space != adata[0].total_disk_space) {
            corrupted = true;
          }    
          
          if (element.free_disk_space < adata[0].free_disk_space) {
            corrupted = true;
          }
          
          
          if (element.ram_capacity != adata[0].ram_capacity) {
            corrupted = true;
          }
          
          diffInMs   = new Date() - new Date(element.entry_date)
          diffInDays = diffInMs / (1000 * 60 * 60 * 24);

          if (diffInDays > adata[0].expiree_date) {
            corrupted = true;
          }          

          if (corrupted == true) {
            corruptedWSS.push(element)
            //console.log(corruptedWSS)
          }
        })
      })

    }));
  }).then(()=>{
    console.log(corruptedWSS)
    res.send(corruptedWSS)
  })

  

})





app.post("/login",(req, res) =>{
  if (req.cookies.token == "1234") {
    res.send(200)
  }

  userData = JSON.parse(JSON.stringify(req.body))  
  if(userData.username == username && userData.password == pwd){
    res.cookie("token", "1234")
    res.send(200)
  }
  else{
    res.sendStatus(403)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})