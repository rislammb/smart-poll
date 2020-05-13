import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import App from '../App';

axios.defaults.baseURL = process.env.REACT_APP_POLL_BACKEND;

const PollContext = createContext();

const PollProvider = () => {
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState({});

  const [loading, setLoading] = useState(true);
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
      axios
        .post('/poll', poll)
        .then((res) => {
          setPoll(res.data);
          setPolls([res.data, ...polls]);
          toggleForm();
        })
        .catch((err) => console.log(err));
    }
  };
  const handleDetails = (poll) => {
    setPoll(poll);
  };
  const editPoll = (editedPoll) => {
    axios
      .post(`/poll/${poll.pollId}/edit`, editedPoll)
      .then((res) => {
        const newPolls = [...polls];
        let index = newPolls.findIndex((p) => p.pollId === poll.pollId);
        newPolls[index] = res.data;

        setPoll(res.data);
        setPolls(newPolls);
        toggleForm();
        setIsEdit(false);
      })
      .catch((err) => console.log(err));
  };
  const deletePoll = (pollId) => {
    if (prompt('Are permitted to delete?') === process.env.REACT_APP_DEL_KEY) {
      axios
        .delete(`/poll/${pollId}`)
        .then(() => {
          let newPolls = [...polls];
          newPolls = newPolls.filter((poll) => poll.pollId !== pollId);
          setPoll({});
          setPolls(newPolls);
        })
        .catch((err) => console.log(err));
    } else {
      alert('You are not permitted to delete!');
    }
  };
  const submitVote = (pollId, voteId) => {
    axios
      .post(`/poll/${pollId}/vote`, { id: voteId })
      .then(() => {
        const newPolls = [...polls];
        let poll = newPolls.find((poll) => poll.pollId === pollId);
        poll.totalVote = poll.totalVote + 1;
        let option = poll.options.find((opt) => opt.id === voteId);
        option.vote = option.vote + 1;
        setPolls(newPolls);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('/polls')
      .then((res) => {
        setPolls(res.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);
  return (
    <PollContext.Provider
      value={{
        polls,
        poll,
        loading,
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
