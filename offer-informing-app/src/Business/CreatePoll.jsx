import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [error, setError] = useState(null);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    if (options.length > 1) {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
    }
  };

  const handleCreatePoll = async (e) => {
    e.preventDefault();
    // Remove any empty options
    const filteredOptions = options.filter(option => option.trim() !== '');
    // Ensure there are options and a question
    if (!question.trim() || filteredOptions.length < 2) {
      setError('Poll must have a question and at least two options.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/polls/create', {
        question,
        options: filteredOptions.map(option => ({ text: option, votes: 0 })) // Format options correctly
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Poll created:', response.data);
      setQuestion('');
      setOptions(['']);
      setError(null);
    } catch (err) {
      setError('Error creating poll.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Create a Poll</h2>
      <form onSubmit={handleCreatePoll} className="space-y-4">
        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="input input-bordered w-full"
              required
            />
            {options.length > 1 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="btn btn-secondary"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addOption} className="btn btn-secondary w-full">
          Add Option
        </button>
        <button type="submit" className="btn btn-primary w-full">Create Poll</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CreatePoll;
