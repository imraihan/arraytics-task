import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from '../features/itemsSlice';

function EditItem({ item, setSelectedItem }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [updateFormData, setUpdateFormData] = useState({ _id: item._id, name: item.name });

  const handleUpdateChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  }

  const handleUpdateItem = async () => {
    const { _id, name } = updateFormData;
    const res = await dispatch(updateItem({ _id, name }));
    if (res.meta.requestStatus === 'fulfilled') {
      setSelectedItem(null); 
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Edit Item</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              value={updateFormData.name}
              onChange={handleUpdateChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                onClick={handleUpdateItem}
              >
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
