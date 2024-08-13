import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Loading, Alert } from 'daisyui';

const ParticipatePolls = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/polls')
      .then((response) => {
        setPolls(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch polls');
        setLoading(false);
      });
  }, []);

  const handleVote = (pollId, optionId) => {
    axios.post(`http://localhost:5000/api/polls/${pollId}/vote`, { optionId })
      .then((response) => {
        alert('Vote submitted successfully');
        setPolls(polls.map((poll) =>
          poll.id === pollId
            ? { ...poll, options: response.data.options }
            : poll
        ));
      })
      .catch((error) => {
        alert('Failed to submit vote');
      });
  };

  return (
    <div className="container mx-auto p-4">
      {loading && <Loading className="text-center" />}
      {error && <Alert status="error">{error}</Alert>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {polls.map((poll) => (
          <Card key={poll.id} className="shadow-lg p-4">
            <h2 className="text-xl font-bold">{poll.question}</h2>
            <div className="mt-4">
              {poll.options.map((option) => (
                <button
                  key={option.id}
                  className="btn btn-outline btn-sm m-1"
                  onClick={() => handleVote(poll.id, option.id)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParticipatePolls;
