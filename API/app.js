
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const pgp = require('pg-promise')()

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'azer'
}

const db = pgp(cn)



app.post('/data/update', (req, res) => {
workstationData = JSON.parse(JSON.stringify(req.body))

//date = new Date().toJSON().slice(0,10).replace(/-/g,'/');

db.any('select * from workstation_data where workstation_id = $1',[workstationData.name])
.then(function(data){
  db.none('update workstation_data set total_disk_space = $1, free_disk_space = $2, ram_capacity = $3, entry_date=$4',
  [workstationData.totalDiskSpace,workstationData.freeDiskSpace,workstationData.ramCapacity, date])
})
.catch(function(erreur){
  db.none('insert into workstation_data values($1,$2,$3,$4,$5)',
  [workstationData.name, workstationData.totalDiskSpace,workstationData.freeDiskSpace,workstationData.ramCapacity, date])
})

  //save inside database
  //****************DB structure******************//
  /*
                        ---workstation_data---
        -workstation_id
        -total_disk_space
        -free_disk_space
        -ram_capacity
        -entry_date

                        ---specs---
        -spec_number
        -total_disk_space
        -free_disk_space
        -ram_capacity
        -expiree--date

                        ---workstation_lookup---
        -workstation_ID
        -spec_number
  */

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})