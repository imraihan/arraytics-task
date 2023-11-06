import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewItem } from '../features/itemsSlice';
import { useNavigate } from 'react-router-dom';

function CreateItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateItem = () => {
    dispatch(createNewItem(formData));
    setFormData({ name: '' });
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Create Item</h2>
          <div className="form-group">
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              value={formData.name}
              name="name"
              onChange={handleInputChange}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleCreateItem}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateItem;
