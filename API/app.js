
const express = require('express')
const app = express()
const port = 3000

const workstationData = 
{
    totalDiskSpace ,
    freeDiskSpace,
    ramCapacity,
    isOnline
}

app.post('/data/update', (req, res) => {
  workstationData = JSON.parse(req.body)

  //save inside database
  //****************DB structure******************//
  /*
                        ---workstation_data---
        -workstation_ID
        -spec_number
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
  */

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})