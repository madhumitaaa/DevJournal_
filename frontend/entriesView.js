const token=localStorage.getItem("token");
if(!token){
    alert("unauthorized please login!!!");
    window.location.href="login.html";
}
async function loadEntries(){
    try{
        const res=await fetch("http://localhost:5000/api/entries",{
                headers:{Authorization:"Bearer "+token}
        });
const entries=await res.json();

const entryList=document.getElementById("entryList");
entryList.innerHTML="";
entries.forEach((entry)=>{
const entryDiv=document.createElement("div");
entryDiv.classList.add("entry-card");
entryDiv.innerHTML=`
        <h3>${entry.title}</h3>
        <p>${entry.note}</p>
        <p>Taf:${entry.tag||'-'}|Mood:${entry.mood},Energy:${entry.energy}</p>
        <p><small>${new Date(entry.createdAt).toLocaleString()}</small></p>
        <button onclick="editEntry('${entry._id}', '${entry.title}', '${entry.note}', '${entry.tag}', '${entry.mood}', '${entry.energy}')">✏️ Edit</button>
        <button onclick="deleteEntry('${entry._id}')">🗑️ Delete</button>
          <hr/>
            `;
            entryList.appendChild(entryDiv);
});
    }
catch(error){
    alert("failed to load entries");
}
}
async function deleteEntry(id){
    if(!confirm("Delete this entry?"))return;
     try{
        const res=await fetch(`http://localhost:5000/api/entries/${id}`,{
                method:"DELETE",
                headers:{Authorization:"Bearer "+token}
        });
        
    if (res.ok) {
      loadEntries(); // refresh
    } else {
      alert("Failed to delete entry");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}
function editEntry(id,title,note, tag, mood, energy){
   const query = new URLSearchParams({ id, title, note, tag, mood, energy }).toString();
  window.location.href = `editentry.html?${query}`;
}


window.onload = loadEntries;