import React, { useState} from 'react';
import axios from 'axios';
import Navbar from "../components/Navbar.js";


export default function Upload(){
  const [form, setForm] = useState({
    name: "",
    location: "",
    land_size: "",
    details: "",
    price: "",
    rating: "",
    islandImg: '',
    is_available: true,
    latitude: "",
    longitude: ""
  });

  // For navigating to different page when signed in
  let successAddedIsland = false;
  let userid = sessionStorage.getItem('userRecordID');

  let formStyle = {padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px'};

  function updateForm(value) {
    return setForm((prev) => {
        return { ...prev, ...value };
    });
  }

  function handleChange(e) {
    form.islandImg = e.target.files[0]
  }

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('location', form.location);
    formData.append('land_size', form.land_size);
    formData.append('details', form.details);
    formData.append('price', form.price);
    formData.append('rating', 0);
    formData.append('latitude', form.latitude);
    formData.append('longitude', form.longitude);
    formData.append('islandImg', form.islandImg);
    formData.append('is_available', form.is_available);
    formData.append('owner_id', userid);

    axios.post("http://localhost:5000/islands/add", formData, {
    }).then(res => {
        successAddedIsland = true;
        //console.log(res);
        if (successAddedIsland) {
          window.location.href = "/userhome";
        }
    }).catch(error => {
      window.alert(error);
      return;
    });
  }

  return (
    <>
      <Navbar page="Add Island" />
      <div className="container">
        <div className="row">
          <div className="offset-lg-3 col-lg-6 col-xs-12">
            <form className="container" onSubmit={onSubmit} encType="multipart/form-data">
              <h3 style={{textAlign: 'center'}}>Add Your Island</h3>
              <div className ="border shadow-sm rounded p-3 mb-3">
                <div className="form-group">
                  <label htmlFor='name'>Island Name</label>
                  <input type="text" name='name' className="form-control" value={form.name} onChange={(e) => updateForm({ name: e.target.value })}/>
                </div>
                <div className="form-group">
                  <label htmlFor='location'>Location</label>
                  <input type="text" name='location' className="form-control" value={form.location} onChange={(e) => updateForm({ location: e.target.value })}/>
                </div>
                <div className="form-group">
                  <label htmlFor='latitude'>Latitude</label>
                  <input type="text" name='latitude' className="form-control" value={form.latitude} onChange={(e) => updateForm({ latitude: e.target.value })}/>
                </div>
                <div className="form-group">
                  <label htmlFor='longitude'>Longitude</label>
                  <input type="text" name='longitude' className="form-control" value={form.longitude} onChange={(e) => updateForm({ longitude: e.target.value })}/>
                </div>
                <div className="form-group">
                  <label htmlFor='land_size'>Size</label>
                  <input type="text" name='land_size' className="form-control" value={form.land_size} onChange={(e) => updateForm({ land_size: e.target.value })}/>
                </div>
                <div className="form-group">
                  <label htmlFor='details'>Details</label>
                  <textarea  name='details' className="form-control" value={form.details} onChange={(e) => updateForm({ details: e.target.value })}/>
                </div>
                <div className="form-group">
                  <label htmlFor='price'>Price</label>
                  <input type="text" name='price' className="form-control" value={form.price} onChange={(e) => updateForm({ price: e.target.value })}/>
                </div>
                <div className="form-group">
                  <input type="file"  onChange={handleChange} />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary" type="submit">Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
