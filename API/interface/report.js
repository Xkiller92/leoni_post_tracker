function RReport(){
    id = window.location.search.split("=")[1]
    //request fot ws info

    wsInfo = "";
    specInfo = ""; 

    const req = new Request("http://localhost:3000/data/workstation/id/")
    req.headers.set("Content-Type", "application/json")
    req.headers.set("Accept", "application/json")
    bod = 
    {
      'id' : id
    }

    const opt = {
        method: "POST",
        //ta3ml sécurité ta3 l broser 'cors: cross origin requests'
        mode: "cors",
        body: JSON.stringify(bod),
        
        
    };

    fetch(req, opt).then(res => res.json()).then(res =>{

        data = JSON.parse(JSON.stringify(res))
        wsInfo = data
        
        //fill the ws part
        totalDisk = document.getElementById("11").value = wsInfo[0].total_disk_space
        freeDisk = document.getElementById("12").value = wsInfo[0].free_disk_space
        ram = document.getElementById("13").value = wsInfo[0].ram_capacity
        date = document.getElementById("14").value = wsInfo[0].entry_date
    })

    //request for ws spec

    const reqq = new Request("http://localhost:3000/data/spec/id")

    reqq.headers.set("Content-Type", "application/json")
    reqq.headers.set("Accept", "application/json")
    bodd = 
    {
      'id' : id
    }

    const optq = {
        method: "POST",
        //ta3ml sécurité ta3 l broser 'cors: cross origin requests'
        mode: "cors",
        body: JSON.stringify(bodd),
        
        
    };

    fetch(reqq, optq).then(res => res.json()).then(res =>{

        data = JSON.parse(JSON.stringify(res))
        specInfo = data

        //fill the spec part
        totalDisk = document.getElementById("21").value = specInfo[0].total_disk_space
        freeDisk = document.getElementById("22").value = specInfo[0].free_disk_space
        ram = document.getElementById("23").value = specInfo[0].ram_capacity
        date = document.getElementById("24").value = specInfo[0].expiree_date
    })

}

RReport()