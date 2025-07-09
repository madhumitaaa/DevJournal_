document.getElementById("registerform")?.addEventListener("submit",async(e)=>{
     e.preventDefault();
    


  const name = document.getElementById("yourname").value;
  const email = document.getElementById("youremail").value.trim();
  const password = document.getElementById("yourpassword").value;
  const confirm = document.getElementById("yourreppassword")?.value;

     if (!email || !password) {
  alert("Please fill in all required fields.");
  return;
}

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }
try{
    const res=await fetch("http://localhost:5000/api/auth/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,email,password}),
    });
 const data= await res.json();
 if (res.ok){
    alert("Registration Successsful please login");
    window.location.href="login.html";
 }
 else{
    alert(data.message||"Registrtion failed");

 }}
catch(err){
 alert("error"+err.message);
}
});

//login form
document.getElementById("loginform")?.addEventListener("submit",async(e)=>{
    e.preventDefault();
       
    const email=document.getElementById("youremail").value;
       const password=document.getElementById("yourpassword").value;
       try{
            const res=await fetch("http://localhost:5000/api/auth/login",{
                method:"POST",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({email,password}),
            }
        );
      const data= await res.json();
      if(res.ok){
        localStorage.setItem("token",data.token);
        alert("login successful");
        window.location.href="view.html";

      }
      else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("Error: " + err.message);
  

    }
});
        

       