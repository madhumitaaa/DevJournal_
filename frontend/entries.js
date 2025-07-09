const token = localStorage.getItem("token");
if (!token) {
    alert("Unauthorized!!please log in");
    window.location.href = "login.html";
}

document.getElementById("entryForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const note = document.getElementById("note").value;
    const tag = document.getElementById("tag").value;
    const mood = document.getElementById("mood").value;
    const energy = document.getElementById("energy").value;
    try {
        console.log("Token being sent:", token);

        const res = await fetch("http://localhost:5000/api/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ title, note, tag, mood, energy }),
        });

      if (res.ok) {
      alert("Entry saved!");
      document.getElementById("entryForm").reset();
      loadEntries();
    } else {
        const ans = await res.json();  
      alert(ans.message || "Failed to save entry");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});

async function loadEntries(){
    try {
            const res=await fetch("http://localhost:5000/api/entries",{
                headers:{Authorization:"Bearer " + token},
    });
    


const entries=await res.json();

const entryList=document.getElementById("entryList");
entryList.innerHTML="";
entries.forEach((entry)=>{
    const entryDiv=document.createElement("div");
    entryDiv.classList.add("entry-card");
 entryDiv.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.note}</p>
        <p>Tag: ${entry.tag || "—"} | Mood: ${entry.mood}, Energy: ${entry.energy}</p>
        <p><small>${new Date(entry.createdAt).toLocaleString()}</small></p>
        <button onclick="deleteEntry('${entry._id}')">Delete</button>
     
      `;
      entryList.appendChild(entryDiv);
})
    }

    catch(err){
        alert("failed to load entries");
    }
}

async function deleteEntry(id){
    if(!confirm("delete this entry?"))return;
    try{
        const res=await fetch(`http://localhost:5000/api/entries/${id}`,{
            method:"DELETE",
            headers:{Authorization:"Bearer "+token},

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

// 🌟 Load entries on page load
window.onload = loadEntries;































