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
import { validate, validateDesOpt } from './validate';

const PollForm = () => {
  const { isEdit, poll, createPoll, editPoll } = useContext(PollContext);
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([
    { id: Math.round(Math.random() * 1000000000000), name: '' },
    { id: Math.round(Math.random() * 1000000000000), name: '' },
  ]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    let newErrors = { ...errors };
    switch (e.target.name) {
      case 'creator':
        newErrors.creator = '';
        setErrors(newErrors);
        setCreator(e.target.value);
        break;
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

    if (!isEdit) {
      const { errors, valid } = validate(
        creator,
        title,
        description,
        newOptions
      );
      if (valid) {
        const newPoll = {
          creator,
          title,
          description,
          options: newOptions,
        };
        createPoll(newPoll);
      } else {
        setErrors(errors);
      }
    } else {
      const { errors2, valid } = validateDesOpt(description, newOptions);
      if (valid) {
        let totalVote = 0;
        const votedOptions = newOptions.filter((opt) => opt.vote);
        votedOptions.map((opt) => (totalVote += opt.vote));
        const editedPoll = {
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
        setErrors({});
      } else {
        setErrors(errors2);
      }
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
      {!isEdit && (
        <FormGroup>
          <div className='d-flex align-items-center'>
            <Label className='creator-label'>Poll Creator</Label>
            <Input
              name='creator'
              value={creator}
              placeholder='Create a username..'
              onChange={handleChange}
            />
          </div>
          <FormFeedback className={errors.creator ? 'd-block' : ''}>
            {errors.creator}
          </FormFeedback>
        </FormGroup>
      )}
      <FormGroup>
        <Label>Poll Title</Label>
        <Input
          name='title'
          value={title}
          placeholder='Enter a poll title..'
          onChange={handleChange}
          disabled={isEdit ? true : false}
        />
        <FormFeedback className={errors.title ? 'd-block' : ''}>
          {errors.title}
        </FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Poll Description</Label>
        <Input
          name='description'
          value={description}
          placeholder='Enter poll description..'
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
