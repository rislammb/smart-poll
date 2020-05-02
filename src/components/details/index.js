import React, { useContext } from 'react';
import { Card, CardTitle, CardBody, CardText, Button } from 'reactstrap';

import { PollContext } from '../../context/poll';
import Options from './Options';

const Details = () => {
  const { poll, setIsEdit, toggleForm, deletePoll } = useContext(PollContext);
  const handleEdit = () => {
    setIsEdit(true);
    toggleForm();
  };

  return poll.title ? (
    <Card>
      <CardBody>
        <CardTitle>
          <h4 className='text-secondary'>{poll.title}</h4>
        </CardTitle>
        <CardText>Description: {poll.description}</CardText>
        <CardText>Total Vote: {poll.totalVote}</CardText>
        <div className='d-flex mb-2'>
          <strong>Options</strong>
          <div className='ml-auto'>
            <Button color='warning' onClick={handleEdit}>
              Edit
            </Button>
            <Button
              className='ml-2'
              color='danger'
              onClick={() => deletePoll(poll.id)}
            >
              Delete
            </Button>
          </div>
        </div>
        <Options
          pollId={poll.id}
          totalVote={poll.totalVote}
          options={poll.options}
        />
      </CardBody>
    </Card>
  ) : (
    <Card>
      <CardBody>
        <h4>Welcome to Smart Poll</h4>
        <p>This Poll made by using core ReactJS</p>
      </CardBody>
    </Card>
  );
};

export default Details;
