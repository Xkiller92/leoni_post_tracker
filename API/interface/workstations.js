function FetchSpecs() {
    container = document.getElementById('workstations')

    container.innerHTML = "";

    //fetch all specs from db

    const req = new Request("http://localhost:3000/data/pairs")

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
            AddSpec(true, element.workstation_id, element.spec_number)
        });
    })
}

function ImportFromExel() {
    //add every workstation in the exel file
}

function ModifySpec(id) {
    //get the values
    specName = document.getElementById(id +'number')
    wsId = document.getElementById(id + 'name')
    //modify the db

    const req = new Request("http://localhost:3000/update/pair")
    req.headers.set("Content-Type", "application/json")
    bod = 
    {
      'specName' : specName,
      'workstationId' : wsId
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
    specName = document.getElementById('number').value
    wsId = document.getElementById('name').value

    //delete entry from db

    const req = new Request("http://localhost:3000/delete/pair")
    req.headers.set("Content-Type", "application/json")
    bod = 
    {
      'specName' : specName,
      'workstationId' : wsId
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

function uuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


function AddSpec(supplied = false, n, s) {
    container = document.getElementById('workstations')

    specName = document.getElementById('number').value
    wsId = document.getElementById('name').value

    if (supplied == true) {
        wsId = n
        specName = s
    }

    //Universally Unique IDentifiier
    UUID = uuid();

    container.innerHTML +=
        "<div class='card my-3 mx-5' 'bg-secondary'>\
        <div class='card-body'>\
        <div class='container text-center'>\
          <div class='row align-items-center'>\
            <div class='col'>\
              <div class='input-group mb-3'>\
                <span class='input-group-text' id='basic-addon3'\
                  >"+specName+"</span\
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
                      >"+ wsId+"</span\
                    >\
                    <input\
                      type='text'\
                      class='form-control'\
                      id='" + UUID + "name'\
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

    if (supplied == false) {
      
    //add the spec to the db
    const req = new Request("http://localhost:3000/collect/pair")
    req.headers.set("Content-Type", "application/json")
    bod = 
    {
      'specName' : specName,
      'workstationId' : wsId
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