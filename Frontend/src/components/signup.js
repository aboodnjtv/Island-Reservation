import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function SignUp() {
 const [form, setForm] = useState({
   fname: "",
   lname: "",
   email: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/user/signup", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ fname: "", lname: "", email: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Sign Up</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="fname">First Name</label>
         <input
           type="text"
           className="form-control"
           id="fname"
           value={form.fname}
           onChange={(e) => updateForm({ fname: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="lname">Last Name</label>
         <input
           type="text"
           className="form-control"
           id="lname"
           value={form.lname}
           onChange={(e) => updateForm({ lname: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Sign Up"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}