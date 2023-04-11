//create divs according to local storages items
for (i = 0; i < localStorage.length; i++) {
    let keys = localStorage.key(i);
    let values = localStorage.getItem(keys);
    let Outputs = document.getElementById("output");
    Outputs.insertAdjacentHTML(
        "beforeend",
        `<div class="card m-4" style="width: 20rem;">
    <div class="card-body">
      <h5 class="card-title">TASK</h5>
      <p class="card-text" id="notename">Name: ${keys}</p>
      <p class="card-text" id="notedes">Description: ${values}</p>
      <button type="submit" class="btn btn-primary" onclick="deletenote('${keys}')">❌  </button>
      <button type="submit" id="edit" class="btn btn-primary" onclick="editnote('${keys}')">✏️</button>
    </div>
  </div>`)
}

//add items to local storage
async function addnote() {
    let nn = document.getElementById("nname").value;
    let nd = document.getElementById("ndesc").value;
    if (nn == "" || nd == "") alert("First Fill-Out Required Fields")
    else if (noteskey.includes(nn)) alert("Note Name already exists")
    else {
        localStorage.setItem(nn, nd)
        let Outputs = document.getElementById("output");
        alert('Successfully Added')
        Outputs.insertAdjacentHTML(
            "beforeend",
            `<div class="card m-4" style="width: 15rem;">
        <div class="card-body">
          <h5 class="card-title">TASK</h5>
          <p class="card-text" id="notename">Name: ${nn}</p>
          <p class="card-text" id="notedes">Description: ${nd}</p>
          <button type="submit" class="btn btn-primary" onclick="deletenote('${nn}')">❌</button>
          <button type="submit" id="edit" class="btn btn-primary" onclick="editnote('${keys}')">✏️</button>
        </div>
      </div>`)
    }
}

//add items to local storage after a successful add operation
noteskey = []
for (let i = 0; i < localStorage.length; i++) {
    let keys = localStorage.key(i);
    noteskey.push(keys)
}

//delete div and item from local storage
let deletenote = (key) => {
    let a = confirm("Are you sure you want to delete?")
    if (a) {
        let Outputs = document.getElementById("output")
        Outputs.addEventListener('click', (event) => {
            let del = event.target;
            del.parentElement.remove()
            localStorage.removeItem(key)
            let index = noteskey.indexOf(key)
            if (index !== -1) {
                noteskey.splice(index, 1)
            }
        })
    }
}

let editnote = (key) => {
    let Outputs = document.getElementById("output")
    Outputs.addEventListener('click', (event) => {
        let edit = event.target;
        let val = localStorage.getItem(key)
        edit.parentElement.remove()
        localStorage.removeItem(key)
        document.getElementById("nname").value = key;
        document.getElementById("ndesc").value = val;
        let index = noteskey.indexOf(key)
        if (index !== -1) {
            noteskey.splice(index, 1)
        }
    })
}

let clearallnotes = () => {
    if (localStorage.length == 0) 
    {
        alert("No Notes Available to Delete")
    }
    else {
        let a = confirm("Are you sure you want to delete all notes?")
        if (a) {
            let Outputs = document.getElementById("output")
            while (Outputs.firstChild) Outputs.removeChild(Outputs.firstChild)
            
            localStorage.clear();
            // while(noteskey.length) noteskey.pop()
            noteskey.length = 0
        }
    }
}
