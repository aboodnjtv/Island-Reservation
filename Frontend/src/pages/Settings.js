import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar.js";


export default function ChangeUserData() {
  // note: user is not allowed to change email

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    password: "",
  });

  // For navigating to different page when signed in
  let successDataChanged = false;
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

    // When a post request is sent to the create url, we'll update the user record in the database.
    const newData = { ...form };

    // get the user's id (never changes) from sessionStorage (stored upon sign in)
    let userRecordString = sessionStorage.getItem("userRecord");
    // get rid of escape characters in user record string
    userRecordString = unescape(userRecordString);
    // make string into json
    let userRecord = JSON.parse(userRecordString);
    // grab id
    let userid = userRecord._id;

    // When submit pressed, make api call
    await fetch("http://localhost:5000/user/update?id=" + userid, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
    .then(async response => {
      // If the HTTP response is 2xx then response.ok will have a value of true
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
        // throw new Error(response.statusText)
      } else {
        successDataChanged = true;
      }
      // return the promise(response.json) so that the next .then can resolve the promise
      return response.json();
    })
    .then(data => {
      // resolve the promise (response.json) as a user record
      let userRecord = JSON.stringify(data);
      // store the user record into session storage to access it on userhomepage
      sessionStorage.setItem("userRecord", userRecord);
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    // Navigate to user homepage if signin success (Should be own user profile)
    if (successDataChanged) {
      window.location.href = "/userhome";
    }
  }

  return (
    <div>
      <Navbar page="Settings" />
      <div className="container">
        <h3>Update Your Information</h3>
        <div className="container">
          <div className="row">
            {/* bootstrap responsive design
          width of  columns on a 12 column grid:
          for xs (mobile) sign up takes whole screen (12 cols)
          for med page size, sign up takes 6 columns
          for large page size, sign up takes 5 cols
          */}
            <div className="col-lg-5 col-md-6 col-xs-12">
              <form
                className="border shadow-sm rounded p-3 mb-3"
                onSubmit={onSubmit}
              >
                <div className="form-group">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    value={form.firstname}
                    onChange={(e) => updateForm({ firstname: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    value={form.lastname}
                    onChange={(e) => updateForm({ lastname: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={form.password}
                    onChange={(e) => updateForm({ password: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
