import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import Sidebar from './components/sidebar';
import Details from './components/details';
import ModalForm from './components/modal';

const App = () => {
  return (
    <Container className='my-3'>
      <Row>
        <Col sm='5' className='mb-2'>
          <Sidebar />
        </Col>
        <Col sm='7'>
          <Details />
        </Col>
      </Row>
      <ModalForm />
    </Container>
  );
};

export default App;
