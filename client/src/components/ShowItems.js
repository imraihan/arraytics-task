import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, deleteItem } from '../features/itemsSlice';
import EditItem from './EditItem';

function ShowItems() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDeleteItem = (_id) => {
    dispatch(deleteItem(_id));
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
  };

  const filteredItems = items
    .filter((item) => {
      if (filter === '' || item.name.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
      return false;
    })
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      {selectedItem && (
        <div className="mb-3">
          <EditItem item={selectedItem} setSelectedItem={setSelectedItem} />
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditItem(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowItems;
