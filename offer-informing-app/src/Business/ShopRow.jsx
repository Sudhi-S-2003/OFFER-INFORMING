import { FaEdit, FaTrash } from 'react-icons/fa';

const ShopRow = ({ shop, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{shop.name}</td>
      <td>{shop.address}</td>
      <td>{shop.contact}</td>
      <td className="flex space-x-2">
        <button
          className="btn btn-info btn-sm"
          onClick={() => onEdit(shop)}
        >
          <FaEdit />
        </button>
        <button
          className="btn btn-error btn-sm"
          onClick={() => onDelete(shop._id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ShopRow;
