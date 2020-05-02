import React, { createContext, useState } from 'react';
import App from '../App';

const PollContext = createContext();

const PollProvider = () => {
  const [polls, setPolls] = useState([
    {
      description:
        'What is your favorite programming language for Front End Web Development.',
      id: 509156922396,
      options: [
        { id: 584836466839, name: 'JavaScript', vote: 2 },
        { id: 776925303531, name: 'C', vote: 0 },
        { id: 872215455450, name: 'PHP', vote: 1 },
        { id: 86845405211, name: 'Python', vote: 0 },
      ],
      title: 'What is your favorite language?',
      totalVote: 3,
    },
  ]);

  const [poll, setPoll] = useState({});
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isPollExist, setIsPollExist] = useState(false);

  const toggleForm = () => setIsOpenForm(!isOpenForm);
  const handleSearch = (value) => setSearchTerm(value);
  const createPoll = (poll) => {
    if (polls.find((p) => p.title === poll.title)) {
      setIsPollExist(true);
    } else {
      setIsPollExist(false);
      setPoll(poll);
      setPolls([poll, ...polls]);
      toggleForm();
    }
  };
  const handleDetails = (poll) => {
    setPoll(poll);
  };
  const editPoll = (editedPoll) => {
    const newPolls = [...polls];
    let index = newPolls.findIndex((poll) => poll.id === editedPoll.id);
    newPolls[index] = editedPoll;

    setPoll(editedPoll);
    setPolls(newPolls);
    toggleForm();
    setIsEdit(false);
  };
  const deletePoll = (pollId) => {
    if (prompt('Are permitted to delete?') === 'firebasePoll') {
      let newPolls = [...polls];
      newPolls = newPolls.filter((poll) => poll.id !== pollId);
      setPoll({});
      setPolls(newPolls);
    } else {
      alert('You are not permitted to delete!');
    }
  };
  const submitVote = (pollId, voteId) => {
    const newPolls = [...polls];
    let poll = newPolls.find((poll) => poll.id === pollId);
    poll.totalVote = poll.totalVote + 1;
    let option = poll.options.find((opt) => opt.id === voteId);
    option.vote = option.vote + 1;
    setPolls(newPolls);
  };
  return (
    <PollContext.Provider
      value={{
        polls,
        poll,
        searchTerm,
        isOpenForm,
        isEdit,
        isPollExist,
        setIsEdit,
        toggleForm,
        handleSearch,
        createPoll,
        handleDetails,
        editPoll,
        deletePoll,
        submitVote,
      }}
    >
      <App />
    </PollContext.Provider>
  );
};

export { PollContext, PollProvider };
