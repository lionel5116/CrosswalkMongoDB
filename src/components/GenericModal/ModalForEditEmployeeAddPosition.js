import React from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Tabs,
  Tab,
  Modal,
} from "react-bootstrap";
import studentInfoApi from '../../api/studentInfoAPI';
import {useEffect,useState} from "react"


function ModalForEditEmployeeAddPosition(props) {

    useEffect(() => {
        fetchPositions();
      },[]);
    
      const [formData, setFormData] = useState({
        EmployeeID: "",
        Position: "",
        SchoolName:""
});

const [btnAssignDisable,setBtnAssignDisable] = useState(true)
      
    async function fetchPositions(e) {   
          checkForAssignButtonEnability(e)
          var _DDPositionSelect = document.getElementById('ddPositionsModal'); 
         

          if (_DDPositionSelect) {
            if (_DDPositionSelect.options.length === 0) {
              let _POSITION_DATA = [];
              var myAPI = new studentInfoApi();
              _POSITION_DATA = await myAPI.fetchPositions();
              //console.log(_POSITION_DATA)

              //  //clear items first - because
              for (let i = _DDPositionSelect.options.length - 1; i >= 0; i--) {
                _DDPositionSelect.remove(i);
              }

              _DDPositionSelect.options[_DDPositionSelect.options.length] =
                new Option("--Select--");
              for (const key in _POSITION_DATA) {
                _DDPositionSelect.options[_DDPositionSelect.options.length] =
                  new Option(_POSITION_DATA[key].PositionName);
              }
            } else {
            }
          }
      
      
       
      }

    async function UpdateCrosswalkRecord(e) {

      e.preventDefault();
      var _newPosition = document.getElementById('ddPositionsModal');

      formData.SchoolName = props.SchoolName
      formData.Position = _newPosition.value
      formData.EmployeeID = props.EmployeeID

      //console.log(formData)
      //return;
      if(formData.SchoolName !== '' &&
        formData.Position !== '' &&
        formData.SchoolName.EmployeeID !== '' &&
        formData.Position.length > 2 
      )
        {
          let _SUCCESS = [];
          var myAPI = new studentInfoApi();
          _SUCCESS = await myAPI.UpdateCrosswalkRecord(formData)
          console.log(_SUCCESS)
          setBtnAssignDisable(true)
        }
        else (
          window.alert('Missing important field selections.. try selecting a new position!!!')
        )
    }

    async function AddCrosswalkRecord(e) {

      e.preventDefault();
      var _newPosition = document.getElementById('ddPositionsModal');

      formData.SchoolName = props.SchoolName
      formData.Position = _newPosition.value
      formData.EmployeeID = props.EmployeeID

  
      if(formData.SchoolName !== '' &&
        formData.Position !== '' &&
        formData.SchoolName.EmployeeID !== '' &&
        formData.Position.length > 2 
      )
        {
          let _SUCCESS = [];
          var myAPI = new studentInfoApi();
          _SUCCESS = await myAPI.AddOrUpdateCrosswalkRecord(formData)
          console.log(_SUCCESS)
          setBtnAssignDisable(true)
        }
        else (
          window.alert('Missing important field selections.. try selecting a new position!!!')
        )
    }

    const checkForAssignButtonEnability = () =>{
    
      var _newPosition = document.getElementById("ddPositionsModal");
      if (_newPosition) {
        if (_newPosition.value !== "--Select--" && _newPosition.value !== "") {
          setBtnAssignDisable(false);
        } else {
          setBtnAssignDisable(true);
        }
      }
    
 
 }

  return (
    <div>
      <Modal
        show={props.showPrimaryModal}
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
          <Form>
            <Row>
              <Col sm={6}>
               
                <Form.Label
                 style={{width:'100px'}}
                >Employee ID</Form.Label>
                <input
                  id={props.EmployeeID}
                  style={styles.modalInputSyle.empIDTextField}
                  value={props.EmployeeID}
                  readOnly
                ></input>
              </Col>

              <Col sm={6}>
               
               <Form.Label
                style={{width:'150px'}}
               >* Certification Info</Form.Label>
             
             </Col>
            </Row>

            <Row>
              <Col sm={6}>
              <Form.Label
              style={{width:'100px'}}>Role</Form.Label>
                <input
                  id={props.Position}
                  style={styles.modalInputSyle.empIDTextField}
                  value={props.Position}
                  readOnly
                ></input>
              </Col>
              <Col sm={6}>
               
               <Form.Label
                style={{width:'150px'}}
               >* Eligilbity Ino</Form.Label>
             
             </Col>
            </Row>

            <Row>
              <Col sm={12}>
              <Form.Label>Select Crosswalk Position</Form.Label>
        
            <select className="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 300 }} 
             id="ddPositionsModal"
             name="ddPositionsModal"
              onChange={props.handleChange_DDPositionsEditEmployee}
              onClick={(e) => fetchPositions(e)}>
             </select>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => AddCrosswalkRecord(e)}
             disabled={btnAssignDisable}>
            Assign Crosswalk Position
          </Button>

          <Button variant="primary" onClick={props.handleClosePrimary()}>
            {props.close}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const styles = {
  modalInputSyle: {
    width: 600,
  },
  empIDTextField: {
    width: 200,
  },
};

export default ModalForEditEmployeeAddPosition;
