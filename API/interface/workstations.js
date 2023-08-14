function Fetchworkstations() {
    container = document.getElementById('workstations')

    container.innerHTML = "";

    //fetch all specs from db

    const req = new Request("http://localhost:3000/data/pairs")

    const opt = {
        method: "GET",
        //ta3ml sécurité ta3 l broser 'cors: cross origin requests'
        mode: "cors",
        headers: {
          'Accept': 'application/json',
        },
    };

    fetch(req, opt).then(res => res.json()).then(res =>{

        data = JSON.parse(JSON.stringify(res))

        data.forEach(element => {
            //TODO
            AddSpec(true, element.workstation_id, element.spec_number)
        });
    })
}

var file = document.getElementById('docpicker')
file.addEventListener('change', importFile);

function importFile(evt) {
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = e => {
      var contents = processExcel(e.target.result);
      console.log(contents)

      contents.forEach(element => {
        const req = new Request("http://localhost:3000/collect/pair")
        req.headers.set("Content-Type", "application/json")
        bod = 
        {
          'specName' : element[0],
          'workstationId' : element[1]
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
      });
    }
    r.readAsBinaryString(f);
  } else {
    console.log("Failed to load file");
  }
}

function processExcel(data) {
  var workbook = XLSX.read(data, {
    type: 'binary'
  });

  var firstSheet = workbook.SheetNames[0];
  var data = to_json(workbook);
  return data
};

function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });
    if (roa.length) result[sheetName] = roa;
  });
  return JSON.stringify(result, 2, 2);
};


function ModifySpec(id) {
    //get the values
    specName = document.getElementById(id +'number').value
    wsId = document.getElementById(id + 'name').value

    console.log(specName)
    console.log(wsId)
    //modify the db

    const req = new Request("http://localhost:3000/modify/pair")
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
    specName = document.getElementById(id +'number').value
    wsId = document.getElementById(id +'name').value

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
    UUID2 = uuid();

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
                  id='" + UUID + "number' value='"+specName+"'\
                  aria-describedby='basic-addon3'\
                />\
              </div>\
            </div>\
            <div class='col'>\
                <div class='input-group mb-3'>\
                    <span class='input-group-text' id='basic-addon3'\
                      >workstation id</span\
                    >\
                    <input\
                      type='text'\
                      class='form-control'\
                      id='" + UUID + "name' value='"+wsId+"'\
                      aria-describedby='basic-addon3'\
                    />\
                  </div>\
            </div>\
          </div>\
          <div class='row align-items-center'>\
            <div class='col'>\
                <button id='"+UUID+"' class='btn btn-danger'>Delete</button>\
            </div>\
            <div class='col'></div>\
            <div class='col'>\
                <button id='"+UUID2+"' class='btn btn-info'>modify</button>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>"


    document.getElementById(UUID).onclick = function(){DeleteSpec(UUID)}
    document.getElementById(UUID2).onclick = function(){ModifySpec(UUID)}

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

Fetchworkstations()