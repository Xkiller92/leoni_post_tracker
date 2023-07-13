
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
  password: 'azer'
}

const db = pgp(cn)



app.post('/collect/workstation', (req, res) => {
workstationData = JSON.parse(JSON.stringify(req.body))

date = new Date().getDate() + "/" +new Date().getMonth() + "/" +new Date().getFullYear();

console.log(date)

db.any('select * from workstation_data where workstation_id = $1',[workstationData.name])
.then(function(data){


  if(data != []){

    db.any('update workstation_data set total_disk_space = $1, free_disk_space = $2, ram_capacity = $3, entry_date = $4',
    [workstationData.totalDiskSpace,workstationData.freeDiskSpace,workstationData.ramCapacity, date])

    
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
  res.send('nice')
})

app.get('/data/specs', (req, res) =>{
  res.send('nice')
})

app.get('/data/spec/name/:name', (req, res) =>{
  res.send('nice')
})

app.post('/update/specs', (req, res) =>{
  res.send('nice')
})

app.delete('/delete/specs', (req, res) =>{
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