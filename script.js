const takenote = document.getElementById('takenote');

const updateLSdata = () => {
    const textareadata = document.querySelectorAll('textarea');
    const notes = [];
    textareadata.forEach((element) => {
        if(element.value) {
            notes.push(element.value);
        }
        return notes;
    });

    localStorage.setItem('notes',JSON.stringify(notes));
};

function takenewnote (text = '')
{
    const note = document.createElement("div");
    note.classList.add("note"); 
    const htmlData = ` 
    <div id="operation">
        <button id="edit" title="edit/save"><i class=" icon ${text ? "far fa-edit" : "far fa-save"}"></i></button>
        <button id="delete" title="delete"><i class="fas fa-trash"></i></button>
    </div>
    <textarea class="${text ? "hidden" : ""}"></textarea> 
    <div id="notearea" class=" notearea ${text ? "" : "hidden"}"></div>
    `;
    note.insertAdjacentHTML("afterbegin",htmlData); 

    const notesedit = note.querySelector('#edit');
    const notesdelete = note.querySelector('#delete');
    const notearea = note.querySelector('#notearea');
    const textarea = note.querySelector('textarea'); 
    const icon = note.querySelector('.icon');
    console.log("icon",icon)

    notesdelete.addEventListener('click',()=>{
        note.remove();
        updateLSdata();
    }); 
 
    textarea.value = text;
    notearea.innerHTML = text;

    notesedit.addEventListener('click',()=>{
        notearea.classList.toggle("hidden");
        textarea.classList.toggle("hidden");
        if(icon.classList.contains("fa-save")) {
            icon.classList.add("fa-edit");
            icon.classList.remove("fa-save");
        }
        else {
            icon.classList.remove("fa-edit");
            icon.classList.add("fa-save");
        } 
    });

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value; 
        notearea.innerHTML=value; 
        updateLSdata();
    }) ;

    document.body.appendChild(note); 
} 


const notes = JSON.parse(localStorage.getItem("notes"));

if(notes)
{
    notes.forEach(element => { 
        takenewnote(element);  
    });
}

takenote.addEventListener('click',()=>takenewnote());

 