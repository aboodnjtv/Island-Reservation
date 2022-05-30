import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar.js";
import ShowReviews from "../components/ShowReviews.js";

function getDateString(date){
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  if(month < 10)
    month = '0' + month.toString();
  if(day < 10)
    day = '0' + day.toString();
  let stringDate = year + '-' + month + '-' + day;
  return stringDate;
}

export default function Reserve() {
  // State for the reservation form
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
  });
  // State for the island that is selected for reservation
  const [island, setIsland] = useState({});
  
  // State for the island's reviews
  const [reviews, setReviews] = useState([]);

  // Get id of logged in user
  let userId = sessionStorage.getItem("userRecordID");

  // Get selected island ID
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let islandId = params.get('island');
  // Get todays date so user cant reserve in the past
  let today = new Date();
  today = getDateString(today);

  // Calculate number of days and total price
  let numDays = Math.floor((Date.parse(form.endDate) - Date.parse(form.startDate)) / 86400000);
  let totalPrice = island.price * numDays;

  // For navigating to different page when successfully reserved
  let successAddBalance = false;
  const navigate = useNavigate();

  // This method will update the form as use is putting in dates
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // Fix this to send the new balance to the db, have backend add this balance to current balance
    const reservationInfo = { ...form }
    reservationInfo.amountPaid = totalPrice;
    // NOTE: USER BALANCE WILL GO TO NAN IF ENTIRE FORM NOT FILLED OUT, NEED TO CHECK THAT FORM IS FILLED OUT

    // When submit pressed, make api call
    await fetch(`http://localhost:5000/reservations/add/${userId}/${islandId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservationInfo),
    })
      .then(async (response) => {
        const data = await response.json();
        // If the HTTP response is 2xx then response.ok will have a value of true
        if (!response.ok) {
          throw new Error(data.message);
          // throw new Error(response.statusText)
        } else {
          successAddBalance = true;
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

  // useEffect is similar to componentDidMount, updates island state for the currently selected island
  useEffect(() => {
    fetch("http://localhost:5000/island?id=" + islandId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      // If the HTTP response is 2xx then response.ok will have a value of true
      if (!response.ok) {
        const data = response.json();
        throw new Error(data.message);
      }
      // return the promise(response.json) so that the next .then can resolve the promise
      return response.json();
    })
    .then(data => {
      // resolve the promise: response.json(), into data as a user record
      setIsland(data);
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    fetch("http://localhost:5000/user/review?id=" + islandId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      if (!response.ok) {
        const data = response.json();
        throw new Error(data.message);
      }
      return response.json();
    })
    .then(data => {
      setReviews(data)
      console.log("review", reviews);
    })
    .catch(error => {
      window.alert(error);
      return;
    });

  }, [islandId])

  console.log("review", reviews);
  return (
    <div>
      <Navbar page="Reserve" />
      <div className="container">
        <div className="card">
        <h3 className="card-title" style={{display: 'flex',  justifyContent:'center'}}>Reserve {island.name}</h3>
        <div className="card-body">
          <div className="card">
            <img src={island.islandImg} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="card-info">
                <div className="card-info-number">{island.rating}</div>
              </div>
              <h4 style={{marginTop: "10px"}}>Details</h4>
              <div className="card-info-number">{island.details} km</div>
            </div>
            </div>
            <form
                className="border shadow-sm rounded p-3 mb-3"
                onSubmit={onSubmit}
              >
                <div className="form-group">
                  <label htmlFor="ddmmyy">Start Date</label>
                  <input
                    type="date"
                    min={today}
                    className="form-control"
                    id="ddmmyy"
                    value={form.startDate}
                    onChange={(e) => updateForm({ startDate: e.target.value, endDate: ""})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ddmmyy">End Date</label>
                  <input
                    type="date"
                    min={form.startDate}
                    className="form-control"
                    id="ddmmyy"
                    value={form.endDate}
                    onChange={(e) => updateForm({ endDate: e.target.value })}
                  />
                </div>
                {numDays > 0 &&
                  <div> {"Total Days: " + numDays}</div>
                }
                {numDays > 0 &&
                  <div> {"Total Price: " + totalPrice}</div>
                }
                {numDays > 0 &&
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Reserve Island"
                      className="btn btn-primary"
                    />
                  </div>
                }
                {numDays <= 0 &&
                  <div> Hourly Reservations will be avaliable soon! </div>
                }
              </form>
              <div>
              <h4 style={{marginTop: "10px"}}>Customers Reviews:</h4>
                {reviews.map((review) =>
                  <div key={review._id}>
                    <ShowReviews item={review}/>
                  </div>
                  )
                }
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
