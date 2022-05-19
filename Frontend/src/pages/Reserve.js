import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar.js";

export default function Reserve() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    islandName: "",
  });

  // Get logged in user info
  let userRecordString = sessionStorage.getItem("userRecord");
  let userRecord = JSON.parse(userRecordString);
  let userId = userRecord.user_info._id;

  // For navigating to different page when successfully added balance
  let successAddBalance = false;
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

    // Fix this to send the new balance to the db, have backend add this balance to current balance
    const newCard = { ...form };
    // NOTE: USER BALANCE WILL GO TO NAN IF ENTIRE FORM NOT FILLED OUT, NEED TO CHECK THAT FORM IS FILLED OUT

    // When submit pressed, make api call
    await fetch(`http://localhost:5000/user/reserve/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    })
      .then(async (response) => {
        const data = await response.json();
        // If the HTTP response is 2xx then response.ok will have a value of true
        if (!response.ok) {
          throw new Error(data.message);
          // throw new Error(response.statusText)
        } else {
          successAddBalance = true;
          // Update session storage to update user homepage
          let userRecord = JSON.parse(sessionStorage.getItem("userRecord"));
          userRecord.user_info.balance = data.balance;
          sessionStorage.setItem("userRecord", JSON.stringify(userRecord));
        }
      })
      .catch((error) => {
        console.log("Error thrown after: .catch((error) =>");
        window.alert(error);
        return;
      });

    // Navigate to signin page if signup success
    if (successAddBalance) {
      console.log("Sucess");
      navigate("/userhome");
    } else {
      console.log("Not Sucess");
    }
  }

  return (
    <div>
      <Navbar page="Add Credit" />
      <div className="container">
        <h3>Reserve Island</h3>
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
                  <label htmlFor="islandName">Island Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="islandName"
                    value={form.islandName}
                    onChange={(e) => updateForm({ islandName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Reserve Island"
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
