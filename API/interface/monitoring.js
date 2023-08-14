function FetchSpecs() {
    //fetch all specs from db

    const req = new Request("http://localhost:3000/data/monitoring")

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

        if (data == []) {
            container = document.getElementById('monitoring')
            container.innerHTML = "everything is fine"
        }else{

        data.forEach(element => {
            //TODO
            AddSpec(element.workstation_id)
        });
    }
    }).catch(() =>{
        alert("problem with getting data from server")
    })
}

function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

function AddSpec(wsID) {
    container = document.getElementById('monitoring')
    UUID = uuid()
    const str = wsID 
    container.innerHTML += "<div class='info'>\
    <button id='"+UUID+"'>"+ str +"</button>\
    </div>"

    document.getElementById(UUID).onclick = function(){ReportWs(wsID)}
}

function ReportWs(id){
    window.location = "./report.html?id=" + id
}

FetchSpecs()