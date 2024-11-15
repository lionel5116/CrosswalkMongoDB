import React from 'react'
import {Button,

    Row,
    Col,Modal} from 'react-bootstrap';

function AlertModal(props) {
  return (
    <div>
      <Modal
        show={props.showAlertModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          {props.actionLabel} {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <Row>
            <Col sm={12}>
            {/*
              <label style={{marginRight:15}}>{props.title}</label>
              
              <input id={props.id} style={styles.modalInputSyle}>
              </input>
              */}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={props.handleOKClick()}
            
              style={{display: props.handleClickTwoVisable}}
            >
            {props.Ok}
          </Button>

          <Button
            variant="primary"
            onClick={props.handleNoClick()}>
            {props.No}
          </Button>

          <Button
            variant="info"
            onClick={props.handleCloseAlertClick()}>
            {props.Close}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  
}


const styles = {
  modalInputSyle: {
    width:600
  }
};


export default AlertModal