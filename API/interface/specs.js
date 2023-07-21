function FetchSpecs(){
    container = document.getElementById('specs')

    container.innerHTML = "";

    //fetch all specs from db

    const req = new Request("http://localhost:3000/data/specs")

    const opt = {
        method: "GET",
        mode: "cors",
    };

    fetch(req, opt).then((res)=>{
        if(res.status != 200){
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

function ImportFromExel(){
  //add every spec in the exel file
}

function ModifySpec(id){
  //get the values
    number = document.getElementById(id +'number')
    sName = document.getElementById(id +'name')
    totalDisk = document.getElementById(id +'totalDisk')
    freeDisk = document.getElementById(id +'freeDisk')
    ram = document.getElementById(id +'ram')
    afkTime = document.getElementById(id +'afktime')
  //modify the db

    const req = new Request("http://localhost:3000/update/spec")
    req.headers.set("Content-Type", "application/json")
    bod = 
    {
      'name' : sName,
      'number' : number,
      'freeDiskSpace' : freeDisk,
      'totalDiskSpace' : totalDisk,
      'ramCapacity' : ram,
      'afkTime' : afkTime 
    }

    const opt = {
        method: "POST",
        mode: "cors",
        body : JSON.stringify(bod)
    };

    fetch(req, opt).then((res)=>{
        if(res.status != 200){
            alert("something went wrong please retry")
            return;
        }
    })

  //refresh
  FetchSpecs()
}

function DeleteSpec(id){
  //get the data
  number = document.getElementById(id +'number')

  //delete entry from db

    const req = new Request("http://localhost:3000/delete/spec")
    req.headers.set("Content-Type", "application/json")
    bod = 
    {
      'number' : number
    }

    const opt = {
        method: "POST",
        mode: "cors",
        body : JSON.stringify(bod)
    };

    fetch(req, opt).then((res)=>{
       if(res.status != 200){
            alert("something went wrong please retry")
            return;
        }
    })

  //refresh
  FetchSpecs()  
}

function AddSpec(supplied = false,n, s, t, f, r, a){
    container = document.getElementById('specs')

    number = document.getElementById('number')
    sName = document.getElementById('name')
    totalDisk = document.getElementById('totalDisk')
    freeDisk = document.getElementById('freeDisk')
    ram = document.getElementById('ram')
    afkTime = document.getElementById('afktime')

    if(supplied == true){
      number = n
      sName = s
      totalDisk = t
      freeDisk = f
      ram = r
      afkTime = a
    }
    
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
                <button onclick='DeleteSpec("+UUID+") type='button' class='btn btn-success'>Delete</button>\
            </div>\
            <div class='col'></div>\
            <div class='col'>\
                <button onclick='ModifySpec("+UUID+")' type='button' class='btn btn-success'>modify</button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>"

    //add the spec to the db
}