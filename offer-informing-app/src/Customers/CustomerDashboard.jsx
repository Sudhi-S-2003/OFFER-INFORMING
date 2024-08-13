import { Link } from 'react-router-dom';
import { FaEye, FaList, FaPoll, FaShoppingCart } from 'react-icons/fa';

function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Customer Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/Auth/Customer/ViewOffers" className="btn btn-primary flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-300 ease-in-out">
          <FaEye className="text-2xl" />
          <span className="text-lg font-medium">View Nearby Offers</span>
        </Link>
        <Link to="/Auth/Customer/ClaimedOffers" className="btn btn-secondary flex items-center justify-center space-x-2 hover:bg-gray-700 transition-colors duration-300 ease-in-out">
          <FaShoppingCart className="text-2xl" />
          <span className="text-lg font-medium">View Claimed Offers</span>
        </Link>
        <Link to="/Auth/Customer/ParticipatePolls" className="btn btn-accent flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors duration-300 ease-in-out">
          <FaPoll className="text-2xl" />
          <span className="text-lg font-medium">Participate in Polls</span>
        </Link>
        <Link to="/Auth/Customer/VotedPolls" className="btn btn-warning flex items-center justify-center space-x-2 hover:bg-yellow-600 transition-colors duration-300 ease-in-out">
          <FaList className="text-2xl" />
          <span className="text-lg font-medium">View Voted Polls</span>
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;
