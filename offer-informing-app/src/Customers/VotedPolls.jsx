import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Loading, Alert } from 'daisyui';

const VotedPolls = () => {
  const [votedPolls, setVotedPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/votedPolls')
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
      {loading && <Loading className="text-center" />}
      {error && <Alert status="error">{error}</Alert>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {votedPolls.map((poll) => (
          <Card key={poll.id} className="shadow-lg p-4">
            <h2 className="text-xl font-bold">{poll.question}</h2>
            <div className="mt-4">
              {poll.options.map((option) => (
                <div key={option.id} className="flex justify-between">
                  <span>{option.text}</span>
                  <span>{option.votes} votes</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VotedPolls;
