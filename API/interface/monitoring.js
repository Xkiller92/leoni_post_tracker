function FetchSpecs() {
    //fetch all specs from db

    const req = new Request("http://localhost:3000/data/monitoring")

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

        if (data = []) {
            container = document.getElementById('monitoring')
            container.innerHTML = "everything is fine"
        }else{

        data.forEach(element => {
            //TODO
            AddSpec(element.workstation_id)
        });
    }
    })
}


function AddSpec(wsID) {
    container = document.getElementById('monitoring')

    container.innerHTML +=
        "<button type='button' class='btn btn-danger'> class='form-control'\
        id='name' onclick='ReportWs("+ wsID +")'>"+ wsID +" </button>"

}

ReportWs(id)(
    window.location = "/report?id=" + id
)

FetchSpecs()