import React, { useState} from 'react';
import axios from 'axios';


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
  });

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
    formData.append('rating', 3);
    formData.append('islandImg', form.islandImg);
    formData.append('is_available', form.is_available);

    axios.post("http://localhost:5000/islands/add", formData, {
    }).then(res => {
        console.log(res)
    }).catch(error => {
        console.log(error.response)
    });
  }

 

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <h3>Island Info Upload</h3>
          <div className="form-group">
            <label htmlFor='name'>Island Name</label>
            <input type="text" name='name' class="form-control" value={form.name} onChange={(e) => updateForm({ name: e.target.value })}/>
          </div>
          <div className="form-group">
            <label htmlFor='location'>Location</label>
            <input type="text" name='location' class="form-control" value={form.location} onChange={(e) => updateForm({ location: e.target.value })}/>
          </div>
          <div className="form-group">
            <label htmlFor='land_size'>Size</label>
            <input type="text" name='land_size' class="form-control" value={form.land_size} onChange={(e) => updateForm({ land_size: e.target.value })}/>
          </div>
          <div className="form-group">
            <label htmlFor='details'>Details</label>
            <textarea  name='details' class="form-control" value={form.details} onChange={(e) => updateForm({ details: e.target.value })}/>
          </div>
          <div className="form-group">
            <label htmlFor='price'>Price</label>
            <input type="text" name='price' class="form-control" value={form.price} onChange={(e) => updateForm({ price: e.target.value })}/>
          </div>
          <div className="form-group">
            <input type="file"  onChange={handleChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}
