import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShopTable from './ShopTable';
import EditShopModal from './EditShopModal';
import LoadingSpinner from './LoadingSpinner';

const ViewShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentShop, setCurrentShop] = useState(null);
  const [shopData, setShopData] = useState({
    name: '',
    address: '',
    contact: '',
  });

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/shops/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShops(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchShops();
  }, []);

  const handleEdit = (shop) => {
    setEditMode(true);
    setCurrentShop(shop);
    setShopData({
      name: shop.name,
      address: shop.address,
      contact: shop.contact,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/shops/update/${currentShop._id}`, shopData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditMode(false);
      setCurrentShop(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (shopId) => {
    if (!window.confirm('Are you sure you want to delete this shop?')) return;
    try {
      const token = localStorage.getItem('token');
      // console.log(shopId)
      await axios.delete(`http://localhost:5000/api/shops/delete/${shopId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShops(shops.filter(shop => shop._id !== shopId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Shops
      </h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ShopTable shops={shops} onEdit={handleEdit} onDelete={handleDelete} />
          {editMode && (
            <EditShopModal
              shopData={shopData}
              setShopData={setShopData}
              handleUpdate={handleUpdate}
              setEditMode={setEditMode}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ViewShops;
