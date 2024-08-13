import { useEffect, useState } from 'react';
import axios from 'axios';

const Loading = () => (
  <div className="text-center py-4">Loading...</div>
);

const Alert = ({ status, children }) => (
  <div className={`p-4 mb-4 text-white ${status === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-lg`}>
    {children}
  </div>
);

const VotedPolls = () => {
  const [votedPolls, setVotedPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/polls//user/votes', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then((response) => {
        setVotedPolls(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch voted polls');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading && <Loading />}
      {error && <Alert status="error">{error}</Alert>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {votedPolls.map((poll) => (
          <div key={poll._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
            <div className="mt-4 space-y-2">
              {poll.options.map((option) => (
                <div key={option._id} className="flex justify-between">
                  <span>{option.text}</span>
                  <span>{option.votes} votes</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotedPolls;
