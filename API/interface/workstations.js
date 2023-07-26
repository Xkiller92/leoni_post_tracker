function FetchSpecs() {
    container = document.getElementById('workstations')

    container.innerHTML = "";

    //fetch all specs from db

    const req = new Request("http://localhost:3000/data/workstations")

    const opt = {
        method: "GET",
        //ta3ml sécurité ta3 l broser 'cors: cross origin requests'
        mode: "cors",
    };

    fetch(req, opt).then((res) => {
        if (res.status != 200) {
            alert("problem with getting data from server")
            return;
        }

        data = JSON.parse(res.body)

        data.forEach(element => {
            //TODO
            AddSpec(true, element, element, element, element, element, element)
        });
    })
}

function ImportFromExel() {
    //add every workstation in the exel file
}

function ModifySpec(id) {
    //get the values
    workstationId = document.getElementById(id + 'workstationid')
    totalDisk = document.getElementById(id + 'totalDisk')
    freeDisk = document.getElementById(id + 'freeDisk')
    ram = document.getElementById(id + 'ram')
    afkTime = document.getElementById(id + 'afktime')
    //modify the db

    const req = new Request("http://localhost:3000/update/workstation")
    req.headers.set("Content-Type", "application/json")
    bod =
    {
        'workstation': workstationId,
        'totalDiskSpace': totalDisk,
        'freeDiskSpace': freeDisk,
        'ramCapacity': ram,
        'afkTime': afkTime
    }

    const opt = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(bod)
    };

    fetch(req, opt).then((res) => {
        if (res.status != 200) {
            alert("something went wrong please retry")
            return;
        }
    })

    //refresh
    Fetchworkstations()
}

function DeleteSpec(id) {
    //get the data
    workstationId = document.getElementById(id + 'workstationid')

    //delete entry from db

    const req = new Request("http://localhost:3000/delete/workstation")
    req.headers.set("Content-Type", "application/json")
    bod =
    {
        'workstationid': workstationId
    }

    const opt = {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(bod)
    };

    fetch(req, opt).then((res) => {
        if (res.status != 200) {
            alert("something went wrong please retry")
            return;
        }
    })

    //refresh
    Fetchworkstations()
}

function AddSpec(supplied = false, w, t, f, r, a) {
    container = document.getElementById('workstations')

    workstationId = document.getElementById('workstationid')
    totalDisk = document.getElementById('totalDisk')
    freeDisk = document.getElementById('freeDisk')
    ram = document.getElementById('ram')
    afkTime = document.getElementById('afktime')

    if (supplied == true) {
        workstationId = w
        totalDisk = t
        freeDisk = f
        ram = r
        afkTime = a
    }

    //Universally Unique IDentifiier
    UUID = "";

    container.innerHTML +=
        "<div class='card my-3 mx-5' 'bg-secondary'>\
        <div class='card-body'>\
        <div class='container text-center'>\
          <div class='row align-items-center'>\
            <div class='col'>\
              <div class='input-group mb-3'>\
                <span class='input-group-text' id='basic-addon3'\
                  >spec number</span\
                >\
                <input\
                  type='text'\
                  class='form-control'\
                  id='" + UUID + "number'\
                  aria-describedby='basic-addon3'\
                />\
              </div>\
            </div>\
            <div class='col'>\
                <div class='input-group mb-3'>\
                    <span class='input-group-text' id='basic-addon3'\
                      >spec name</span\
                    >\
                    <input\
                      type='text'\
                      class='form-control'\
                      id='" + UUID + "name'\
                      aria-describedby='basic-addon3'\
                    />\
                  </div>\
            </div>\
            <div class='col'>\
                <div class='input-group mb-3'>\
                    <span class='input-group-text' id='basic-addon3'\
                      >total disk space</span\
                    >\
                    <input\
                      type='text'\
                      class='form-control'\
                      id='" + UUID + "totalDisk'\
                      aria-describedby='basic-addon3'\
                    />\
                  </div>\
            </div>\
          </div>\
          <div class='row align-items-center'>\
            <div class='col'>\
                <div class='input-group mb-3'>\
                    <span class='input-group-text' id='basic-addon3'\
                      >free disk space</span\
                    >\
                    <input\
                      type='text'\
                      class='form-control'\
                      id='" + UUID + "freeDisk'\
                      aria-describedby='basic-addon3'\
                    />\
                  </div>\
            </div>\
            <div class='col'>\
                <div class='input-group mb-3'>\
                    <span class='input-group-text' id='basic-addon3'\
                      >ram capacity</span\
                    >\
                    <input\
                      type='text'\
                      class='form-control'\
                      id='" + UUID + "ram'\
                      aria-describedby='basic-addon3'\
                    />\
                  </div>\
            </div>\
            <div class='col'>\
                <div class='input-group mb-3'>\
                    <span class='input-group-text' id='basic-addon3'\
                      >num of days till AFK</span\
                    >\
                    <input\
                      type='text'\
                      class='form-control'\
                      id='" + UUID + "afkTime'\
                      aria-describedby='basic-addon3'\
                    />\
                  </div>\
            </div>\
          </div>\
          <div class='row align-items-center'>\
            <div class='col'>\
                <button onclick='DeleteSpec("+ UUID + ") type='button' class='btn btn-success'>Delete</button>\
            </div>\
            <div class='col'></div>\
            <div class='col'>\
                <button onclick='ModifySpec("+ UUID + ")' type='button' class='btn btn-success'>modify</button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>"

    //add the spec to the db
}