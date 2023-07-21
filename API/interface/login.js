function connect(){
    user = document.getElementById("user").value
    pwd = document.getElementById("pwd").value
    console .log(user + pwd)
    const req = new Request("http://localhost:3000/login")
    req.headers.set("Content-Type", "application/json")
    bod = {username : user, password : pwd}

    const opt = {
        method: "POST",
        mode: "cors",
        body : JSON.stringify(bod)
    };

    fetch(req, opt).then((res)=>{
        if (res.status == 403) {
            alert("username or password incorrect")
            return;
        }
        else if(res.status != 200){
            alert("something went wrong")
            return;
        }

        window.location = "/home.html"
    })
}