function FetchSpecs(){
    container = document.getElementById('specs')

    container.innerHTML = "";

    //fetch all specs from db

    const req = new Request("http://localhost:3000/data/specs")

    const opt = {
        method: "GET",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
        },
    };

    fetch(req, opt).then(res => res.json()).then(res =>{
      


        data = JSON.parse(JSON.stringify(res))
        console.log(data)
        data.forEach(element => {
          //TODO
            AddSpec(true, element.spec_number, element.spec_name, element.total_disk_space, element.free_disk_space, element.ram_capacity, element.expiree_date)           
        });
    })
}

function ImportFromExel(){
  //add every spec in the exel file
}

function ModifySpec(id){
  //get the values
    number = document.getElementById(id +'number').value
    sName = document.getElementById(id +'name').value
    totalDisk = document.getElementById(id +'totalDisk').value
    freeDisk = document.getElementById(id +'freeDisk').value
    ram = document.getElementById(id +'ram').value
    afkTime = document.getElementById(id +'afktime').value
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
  number = document.getElementById(id +'number').value

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

function uuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function AddSpec(supplied = false,n, s, t, f, r, a){
    container = document.getElementById('specs')

    number = document.getElementById('number').value
    sName = document.getElementById('name').value
    totalDisk = document.getElementById('totalDisk').value
    freeDisk = document.getElementById('freeDisk').value
    ram = document.getElementById('ram').value
    afkTime = document.getElementById('afkTime').value

    if(supplied == true){
      number = n
      sName = s
      totalDisk = t
      freeDisk = f
      ram = r
      afkTime = a
    }
    
    UUID = uuid();

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
                  aria-describedby='basic-addon3' value='"+ number +"'\
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
                      aria-describedby='basic-addon3' value='"+ sName +"'\
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
                      aria-describedby='basic-addon3' value='"+ totalDisk +"'\
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
                      aria-describedby='basic-addon3' value='"+ freeDisk +"'\
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
                      aria-describedby='basic-addon3' value='"+ ram +"'\
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
                      aria-describedby='basic-addon3' value='"+ afkTime +"'\
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
    if(supplied == false){
      //add the spec to the db
    const req = new Request("http://localhost:3000/collect/specs")
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
}
}

FetchSpecs()