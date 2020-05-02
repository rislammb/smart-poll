import React, { useContext } from 'react';
import { Modal, ModalHeader, ModalBody, FormFeedback } from 'reactstrap';

import { PollContext } from '../../context/poll';
import PollForm from './PollForm';

const ModalForm = () => {
  const { isOpenForm, isEdit, setIsEdit, isPollExist, toggleForm } = useContext(
    PollContext
  );

  const toggleFormFn = () => {
    toggleForm();
    if (isEdit) setIsEdit(false);
  };

  return (
    <Modal isOpen={isOpenForm}>
      <ModalHeader toggle={toggleFormFn}>
        {isEdit ? 'Edit This Poll' : 'Create A New Poll'}
      </ModalHeader>
      <ModalBody>
        <FormFeedback className={isPollExist ? 'd-block text-center' : ''}>
          <strong> This Poll has already exist</strong>
        </FormFeedback>
        <PollForm />
      </ModalBody>
    </Modal>
  );
};

export default ModalForm;
