
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

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

      db.any('update specs set spec_name = $1, total_disk_space = $2, free_disk_space = $3, ram_capacity = $4, expiree_date = $5 where specs = $6',
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

app.get('/data/spec/name/:name', (req, res) =>{
  
  db.any('select * from specs where spec_name = '[req.params.name])
  .then(function(data){
    res.send(data)
  })

})

app.post('/update/specs', (req, res) =>{
  SpecsData = JSON.parse(JSON.stringify(req.body))
  db.any('update specs set spec_name = $1, total_disk_space = $2, free_disk_space = $3, ram_capacity = $4, expiree_date = $5 where specs = $6',
    [SpecsData.name,SpecsData.totalDiskSpace,SpecsData.freeDiskSpace,SpecsData.ramCapacity,date,SpecsData.number])
  res.send('nice')
})

app.delete('/delete/specs', (req, res) =>{
  SpecsData = JSON.parse(JSON.stringify(req.body))
  db.any('delete * from specs where specs = $1',[SpecsData.number])
  res.send('nice')
})

app.get('/data/workstations', (req, res) =>{
  db.any('select from workstation_data')
  .then(function(data){
    res.send(data)
  })
})

app.get('/data/workstation/name/:name', (req, res) =>{
  db.any('select * from workstation_data where workstation_id = $1',[req.params.name])
  .then(function(data){
    res.send(data)
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})