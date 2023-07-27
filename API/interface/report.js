function Report(){
    id = window.location.search.split("=")[1]
    
    //request fot ws info

    wsInfo = "";
    specInfo = ""; 

    const req = new Request("http://localhost:3000/data/workstation/id/"+ id)

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
        wsInfo = data

    })

    //request for ws spec

    const reqq = new Request("http://localhost:3000/data/spec/id/" + id)

    const optq = {
        method: "GET",
        //ta3ml sécurité ta3 l broser 'cors: cross origin requests'
        mode: "cors",
    };

    fetch(reqq, optq).then((res) => {
        if (res.status != 200) {
            alert("problem with getting data from server")
            return;
        }

        data = JSON.parse(res.body)
        specInfo = data
    })

    //comparason 
    if (wsInfo.total_disk_space != specInfo.total_disk_space) {
        
    }

    if (wsInfo.free_disk_space < specInfo.free_disk_space) {
        
    }

    if (wsInfo.ram_capacity != specInfo.ram_capacity) {
        
    }

    lastActive = new Date(wsInfo.entry_date)

    if (lastActive) {
        
    }

/*    Table "public.workstation_data"
    Column      | Type | Collation | Nullable | Default
------------------+------+-----------+----------+---------
workstation_id   | text |           | not null |
total_disk_space | real |           |          |
free_disk_space  | real |           |          |
ram_capacity     | real |           |          |
entry_date       | date |           |          |
Indexes:
  "workstation_data_pkey" PRIMARY KEY, btree (workstation_id)


railway=# \d specs
                  Table "public.specs"
    Column      |  Type   | Collation | Nullable | Default
------------------+---------+-----------+----------+---------
spec_number      | integer |           | not null |
spec_name        | text    |           |          |
total_disk_space | real    |           |          |
free_disk_space  | real    |           |          |
ram_capacity     | integer |           |          |
expiree_date     | integer |           |          |
Indexes:
  "specs_pkey" PRIMARY KEY, btree (spec_number)
*/
}

function AddComparasion(left, right){
    container = document.getElementById("container")
}