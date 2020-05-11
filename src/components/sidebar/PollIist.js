import React, { useContext } from 'react';
import { ListGroupItem, Badge } from 'reactstrap';

import { PollContext } from '../../context/poll';

const PollList = (props) => {
  const { handleDetails, poll } = useContext(PollContext);

  return (
    <ListGroupItem
      className={
        props.poll.pollId === poll.pollId ? 'd-flex item-active' : 'd-flex'
      }
      onClick={() => handleDetails(props.poll)}
    >
      <h6 className='text-success'>{props.poll.title}</h6>{' '}
      <Badge color='info' className='ml-1 align-self-start' pill>
        {props.poll.totalVote}
      </Badge>
    </ListGroupItem>
  );
};

export default PollList;
