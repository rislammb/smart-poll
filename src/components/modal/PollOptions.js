import React from 'react';
import { FormGroup, Input, Button } from 'reactstrap';

const PollOptions = ({ options, setOptions }) => {
  const handleOptionChange = (optId, e) => {
    let newOptions = [...options];
    const index = newOptions.findIndex((opt) => opt.id === optId);
    newOptions[index].name = e.target.value;
    setOptions(newOptions);
  };
  const deleteOption = (optId) => {
    const newOptions = options.filter((opt) => opt.id !== optId);
    setOptions(newOptions);
  };
  return (
    <div>
      {options.map((opt, index) => (
        <FormGroup key={opt.id} className='d-flex'>
          <Input
            name='option'
            value={opt.name}
            placeholder={`Option ${index + 1}`}
            onChange={(e) => handleOptionChange(opt.id, e)}
          />
          <Button
            color='danger'
            className='ml-2'
            disabled={options.length < 3}
            onClick={() => deleteOption(opt.id)}
          >
            Delete
          </Button>
        </FormGroup>
      ))}
    </div>
  );
};

export default PollOptions;
