import React from 'react';

const EditShopModal = ({ shopData, setShopData, handleUpdate, setEditMode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update Shop</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-control mb-4">
            <label className="label" htmlFor="name">Shop Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full"
              placeholder="Enter shop name"
              value={shopData.name}
              onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              className="textarea textarea-bordered w-full"
              placeholder="Enter shop address"
              value={shopData.address}
              onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label" htmlFor="contact">Contact Number</label>
            <input
              type="text"
              name="contact"
              id="contact"
              className="input input-bordered w-full"
              placeholder="Enter contact number"
              value={shopData.contact}
              onChange={(e) => setShopData({ ...shopData, contact: e.target.value })}
              required
            />
          </div>
          <div className="form-control mt-6 flex space-x-2">
            <button type="submit" className="btn btn-primary w-full">Update</button>
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShopModal;
