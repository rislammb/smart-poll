import React, { useState, useContext, useEffect } from 'react';
import {
  FormGroup,
  CustomInput,
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

import { PollContext } from '../../context/poll';

const Options = ({ pollId, totalVote, options }) => {
  const { submitVote } = useContext(PollContext);
  const [voteId, setVoteId] = useState('');
  const [voterName, setVoterName] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!voteId) {
      newErrors.vote = 'Please select your opinion';
      setErrors(newErrors);
    }
    if (voterName.trim().length < 3) {
      newErrors.name = 'Name at least 3 charecters long';
      setErrors(newErrors);
    }
    if (voteId && voterName.trim().length > 2) {
      setErrors({});
      submitVote(pollId, +voteId);
    }
  };

  useEffect(() => {
    setErrors({});
    setVoteId('');
  }, [options]);
  return (
    <Form onSubmit={handleSubmit}>
      {options.map((opt) => (
        <FormGroup key={opt.id} className='d-flex align-items-center'>
          <CustomInput
            type='radio'
            id={opt.id}
            name='option'
            value={opt.id}
            onChange={(e) => setVoteId(e.target.value)}
          />
          {opt.imageUrl && (
            <img src={opt.imageUrl} alt='opt' className='opt-image' />
          )}
          <div>{opt.name}</div>
          <div className='ml-auto'>
            <Button size='sm' color='success'>
              {opt.vote}
            </Button>
            <Button size='sm' color='warning' className='ml-1'>
              {opt.vote ? ((opt.vote / totalVote) * 100).toFixed(1) : 0.0}%
            </Button>
          </div>
        </FormGroup>
      ))}
      <FormFeedback className={errors.vote ? 'd-block mb-1' : ''}>
        {errors.vote}
      </FormFeedback>
      <FormGroup>
        <Label>Enter Your Name</Label>
        <Input
          bsSize='sm'
          name='voter'
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
          placeholder='Enter your name...'
        />
        <FormFeedback className={errors.name ? 'd-block' : ''}>
          {errors.name}
        </FormFeedback>
      </FormGroup>
      <Button type='submit' color='info' size='sm'>
        Submit Your Opinion
      </Button>
    </Form>
  );
};

export default Options;
