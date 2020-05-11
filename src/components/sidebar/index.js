import React, { useContext } from 'react';
import {
  Spinner,
  Input,
  Button,
  ListGroup,
  Card,
  CardBody,
  ListGroupItem,
} from 'reactstrap';

import { PollContext } from '../../context/poll';

import PollList from './PollIist';

const Sidebar = () => {
  const { loading, polls, searchTerm, handleSearch, toggleForm } = useContext(
    PollContext
  );

  const performSearch = () => {
    return polls.filter((poll) =>
      poll.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const getView = () => {
    const polls = performSearch();
    return polls.length > 0 ? (
      <ListGroup>
        {polls &&
          polls.map((poll) => <PollList key={poll.pollId} poll={poll} />)}
      </ListGroup>
    ) : (
      <ListGroup>
        <ListGroupItem color='warning'>There is no poll to show</ListGroupItem>
      </ListGroup>
    );
  };
  return (
    <Card>
      <CardBody>
        <div className='d-flex mb-3'>
          <Input
            className='mr-2'
            placeholder='Search...'
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button color='primary' onClick={toggleForm}>
            New
          </Button>
        </div>
        <div>
          <h5>Poll List</h5>
          {loading ? (
            <div className='text-center'>
              <Spinner type='grow' color='primary' />
              <Spinner type='grow' color='secondary' />
              <Spinner type='grow' color='success' />
            </div>
          ) : (
            getView()
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Sidebar;
