import React, { useState, useContext, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';

import { PollContext } from '../../context/poll';
import PollOptions from './PollOptions';
import { validate } from './validate';

const PollForm = () => {
  const { isEdit, poll, createPoll, editPoll } = useContext(PollContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([
    { id: 34245452644, name: '' },
    { id: 34245467238, name: '' },
  ]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let newErrors = { ...errors };
    switch (e.target.name) {
      case 'title':
        newErrors.title = '';
        setErrors(newErrors);
        setTitle(e.target.value);
        break;
      case 'description':
        newErrors.description = '';
        setErrors(newErrors);
        setDescription(e.target.value);
        break;
      default:
        break;
    }
  };

  const addOption = () => {
    const newOptions = [
      ...options,
      { id: Math.round(Math.random() * 1000000000000), name: '' },
    ];
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOptions = options.filter((opt) => opt.name.trim() !== '');
    const { errors, valid } = validate(title, description, newOptions);
    if (valid) {
      if (!isEdit) {
        const newPoll = {
          id: Math.round(Math.random() * 1000000000000) + 9,
          title,
          description,
          totalVote: 0,
          options: newOptions.map((opt) => {
            return {
              id: Math.round(Math.random() * 1000000000000) + 3,
              name: opt.name.trim(),
              vote: 0,
            };
          }),
        };
        createPoll(newPoll);
      } else {
        let totalVote = 0;
        const votedOptions = newOptions.filter((opt) => opt.vote);
        votedOptions.map((opt) => (totalVote += opt.vote));
        const editedPoll = {
          id: poll.id,
          title,
          description,
          totalVote,
          options: newOptions.map((opt) => {
            return {
              id: opt.id
                ? opt.id
                : Math.round(Math.random() * 1000000000000) + 3,
              name: opt.name.trim(),
              vote: opt.vote ? opt.vote : 0,
            };
          }),
        };
        editPoll(editedPoll);
      }
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(poll.title);
      setDescription(poll.description);
      setOptions(poll.options);
    }
  }, [isEdit, poll]);
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Todo Title</Label>
        <Input
          name='title'
          value={title}
          placeholder='Enter a todo title'
          onChange={handleChange}
        />
        <FormFeedback className={errors.title ? 'd-block' : ''}>
          {errors.title}
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Todo Description</Label>
        <Input
          name='description'
          value={description}
          placeholder='Enter todo description'
          onChange={handleChange}
        />
        <FormFeedback className={errors.description ? 'd-block' : ''}>
          {errors.description}
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        Enter Poll Options
        <Button
          color='success'
          className='ml-4'
          size='sm'
          onClick={addOption}
          disabled={options.length > 4}
        >
          Add Option
        </Button>
        <FormFeedback className={errors.options ? 'd-block' : ''}>
          {errors.options}
        </FormFeedback>
      </FormGroup>
      <PollOptions options={options} setOptions={setOptions} />
      <Button type='submit' color='primary'>
        {isEdit ? 'Edit Poll' : 'Create Poll'}
      </Button>
    </Form>
  );
};

export default PollForm;
