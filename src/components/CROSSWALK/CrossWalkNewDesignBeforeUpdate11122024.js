import React, { useState,useEffect,useLayoutEffect} from 'react';
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';
import { Tab ,Tabs} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion';


import Container from "react-bootstrap/Container";
import { connect } from "react-redux";




//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import studentInfoApi from '../../api/studentInfoAPI';



import { Trash } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';

import ModalForRecordSearch from '../GenericModal/ModalForRecordSearch';


import "react-datepicker/dist/react-datepicker.css";


//CROSSWALK
import CROSSWALK_LOGO from "../../images/CROSSWALK_LOGO.png";

//this is used in the reusable control SchoolListDropdown.js
import SchoolListDropDown from '../reusable/SchoolListDropDown'
import EmployeeIDListDropDown from '../reusable/EmployeeIDListDropDown';
import PositionListDropDown from '../reusable/PositionListDropDown';
import { fetchCrosswalkEntryData } from '../../actions/crosswalk';
import { AddOrUpdateCrosswalkRecord } from '../../actions/crosswalk';
import { fetchCrosswalkEntriesFilteredBySchool } from '../../actions/crosswalk';
import { DeleteCrosswalkRecord } from '../../actions/crosswalk';
import { checkForDuplicateCrosswalkRecord } from '../../actions/crosswalk';
import { fetchEmployeeData } from '../../actions/crosswalk';
import { fetchEmployeeIDSBySchoolName } from '../../actions/crosswalk';
import ModalForEditEmployee from '../GenericModal/ModalForEditEmployee';
import { UpdateCrosswalkRecord } from '../../actions/crosswalk';



export const CrossWalkNewDesign = ({fetchCrosswalkEntryData,
                          AddOrUpdateCrosswalkRecord,
                          fetchCrosswalkEntriesFilteredBySchool,
                          DeleteCrosswalkRecord,
                          checkForDuplicateCrosswalkRecord,
                          fetchEmployeeData,
                          fetchEmployeeIDSBySchoolName,
                          UpdateCrosswalkRecord}) => {



  const [tblSearchResultsCrossWalkData, setSearchResultsCrossWalkData] = useState([])
  const [tblSearchResultsAllEmployeeData, setSearchResultsAllEmployeeData] = useState([])
  const [tblSearchEmpIDsBySchoolName, setSearchEmpIDsBySchoolName] = useState([])
  const [btnAssignDisable,setBtnAssignDisable] = useState(true)


  //for modal
  const [showMEditEmp, setshowMEditEmp] = useState(false);
  const [show, setShow] = useState(false);
  const [_EmployeeID, setEmployeeID] = useState(0);

  const [_EmployeeIDEdit, setEmployeeIDEdit] = useState('');
  const [_SchoolNameEdit,setSchoolNameEmpEdit]= useState('');
  const [_PositionEdit,setPositionEdit]= useState('');

  const [_SchoolNameDescription, setSchoolName] = useState('');
  const [_EmployeeName, setEmployeeName] = useState('');
  const [_Role, setRole] = useState('');
  const [_Cert, setCert] = useState('');

  useLayoutEffect(() => {
    document.body.style.backgroundColor = "#f4efdc"
});

  function handleKeyDown(event) {
    if (event.key === "Enter"){
      
      event.preventDefault()
    }
}


const [formData, setFormData] = useState({
        EmployeeID: "",
        Position: "",
        SchoolName:""
});

const {
        EmployeeID,
        Position,
        SchoolName
} = formData;

//const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });

//ON CHANGE EVENTS ********
const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

const onChangeEditEmployeeModal = e => setFormData({...formData, [e.target.name]: e.target.value});

function handleChange_DDPositions (e){
      e.preventDefault();
      setFormData({...formData, [e.target.name]: e.target.value});
      checkForAssignButtonEnability(e)
}

function handleChange_DDPositionsEditEmployee (e){
  e.preventDefault();
  setFormData({...formData, [e.target.name]: e.target.value});
  
}


function handleChange_SchoolChange (e){
      const { value } = e.target;
      e.preventDefault();
      setFormData({...formData, [e.target.name]: e.target.value});
      LoadCrosswalkEntries(e,value)
      fetchEmployeeIDSFilteredBySchool(e,value)
      AllEmployeesFilteredBySchool(e,value)
      setSchoolName('')
      setEmployeeName('')
      setRole('')
      setCert('')
}

function handleChange_EmployeeID (e){
  e.preventDefault();
  setFormData({...formData, [e.target.name]: e.target.value});
  fetchEmployeeDetails(e, e.target.value)
}


/*
function enableAssingButton(enabled){
  var _btnAssignSubmitButton = document.getElementById('btnSubmitPosition');
  _btnAssignSubmitButton.disabled = enabled

}
*/

const checkForAssignButtonEnability = (e) =>{
     e.preventDefault()
  var _ddSchoolListings = document.getElementById('SchoolName');
  var _ddPositions = document.getElementById('Position');
  var _ddEmployeeIDs= document.getElementById('ddEmployeeIDs');

  
  if (_ddSchoolListings.value !=='--Select--' && 
      _ddPositions.value !=='--Select--' && 
      _ddEmployeeIDs.value !=='--Select--' && 
      _ddSchoolListings.value !=='' && 
      _ddPositions.value !=='' && 
      _ddEmployeeIDs.value !=='') {
        setBtnAssignDisable(false)
    }
    else {
      setBtnAssignDisable(true)
    }

}



//CROSSWALK COMMIT OPERATIONS***
const writeAndFetchCrosswalkEntries = async (e) => {
      e.preventDefault()

      let _FETCH_DATA = [];
      _FETCH_DATA = await checkForDuplicateCrosswalkRecord(formData);
    
      if(_FETCH_DATA.length > 0)
      {
        console.log("This student has already been crosswalked!!!")
        window.alert("This student has already been crosswalked!!!")
        return
      }
      else {
      
      }

      await AssignAndfetchCrosswalkEntries()
      await LoadCrosswalkEntries(e,formData.SchoolName)
      reloadPositionList(e)
}

const AssignAndfetchCrosswalkEntries = async () => {

      setSearchResultsCrossWalkData([]);
      try {
        await AddOrUpdateCrosswalkRecord(formData);
      }
      catch (err) {
          console.log(err)
          setSearchResultsCrossWalkData([]);
      }
}

const ReLoadCrosswalkEntries = async () => {
  let _FETCH_DATA = [];
  setSearchResultsCrossWalkData([]);

  _FETCH_DATA = await fetchCrosswalkEntriesFilteredBySchool(formData.SchoolName);

  if(_FETCH_DATA !== null)
  {
   setSearchResultsCrossWalkData(_FETCH_DATA)
  }
  else {

   setSearchResultsCrossWalkData([]);
  }
  
}

const LoadCrosswalkEntries = async (e,schoolName) => {
      e.preventDefault()
      let _FETCH_DATA = [];
      setSearchResultsCrossWalkData([]);

      _FETCH_DATA = await fetchCrosswalkEntriesFilteredBySchool(schoolName);
    
      if(_FETCH_DATA !== null)
      {
       setSearchResultsCrossWalkData(_FETCH_DATA)
      }
      else {
 
       setSearchResultsCrossWalkData([]);
      }
      
}

const fetchEmployeeDetails = async (e,EmployeeID) => {
      e.preventDefault()
      let _FETCH_DATA = [];
      

      _FETCH_DATA = await fetchEmployeeData(EmployeeID);
    
      if(_FETCH_DATA !== null)
      {
        /*
         console.log(_FETCH_DATA[0].EmployeeName)
         var _txtEmpDetails = document.getElementById('txtEmpDetails');
         _txtEmpDetails.value = ''
         var EmployeeDetailsString = "Employee: "
         EmployeeDetailsString +=  _FETCH_DATA[0].EmployeeName;
         EmployeeDetailsString += "-"
         EmployeeDetailsString += "School: "
         EmployeeDetailsString += _FETCH_DATA[0].SchoolName;
        EmployeeDetailsString += "-"
         EmployeeDetailsString += "Role: "
         EmployeeDetailsString += _FETCH_DATA[0].Role;
         EmployeeDetailsString += "-"
         EmployeeDetailsString += "Certification: "
         EmployeeDetailsString += _FETCH_DATA[0].Certification;

         _txtEmpDetails.value = EmployeeDetailsString
         */

         setSchoolName(_FETCH_DATA[0].SchoolName)
         setEmployeeName(_FETCH_DATA[0].EmployeeName)
         setRole(_FETCH_DATA[0].Role)
         setCert(_FETCH_DATA[0].Certification)
      }
      else {
 
       
      }
      
}
const AllEmployeesFilteredBySchool = async (e,SchoolName) => {
  e.preventDefault()
  let _FETCH_DATA = [];
  

  _FETCH_DATA = await fetchEmployeeIDSBySchoolName(SchoolName);

  if(_FETCH_DATA !== null)
  {

    setSearchResultsAllEmployeeData(_FETCH_DATA)

  }
  else {  //do nothing, no schools found
  }
  
}


//DROPDOWN LIST REFRESH METHODS
const fetchEmployeeIDSFilteredBySchool = async (e,SchoolName) => {
      e.preventDefault()
      let _FETCH_DATA = [];
      

      _FETCH_DATA = await fetchEmployeeIDSBySchoolName(SchoolName);
    
      if(_FETCH_DATA !== null)
      {

        setSearchEmpIDsBySchoolName(_FETCH_DATA)
      
        var _DDEmployeeIDSelect = document.getElementById('ddEmployeeIDs'); 

        //  //clear items first - because
        for (let i = _DDEmployeeIDSelect.options.length - 1; i >= 0; i--) {
          _DDEmployeeIDSelect.remove(i);
        }

        _DDEmployeeIDSelect.options[_DDEmployeeIDSelect.options.length] = new Option('--Select--');
        
        for(const key in _FETCH_DATA) {     
          _DDEmployeeIDSelect.options[_DDEmployeeIDSelect.options.length] = new Option(_FETCH_DATA[key].EmployeeID);
        }
    

      }
      else {  //do nothing, no schools found
      }
      
}
const reloadPositionList = async(e) => {
  e.preventDefault()

  let _POSITION_DATA = [];
      var myAPI = new studentInfoApi();
      _POSITION_DATA = await myAPI.fetchPositions()
     
      var _DDPositionSelect = document.getElementById('Position'); 

         //  //clear items first - because
         for (let i = _DDPositionSelect.options.length - 1; i >= 0; i--) {
          _DDPositionSelect.remove(i);
        }
  
      _DDPositionSelect.options[_DDPositionSelect.options.length] = new Option('--Select--');
      for(const key in _POSITION_DATA) {     
        _DDPositionSelect.options[_DDPositionSelect.options.length] = new Option(_POSITION_DATA[key].Position);
      }
}


/*MODAL ACTIONS */
const closeModalPrimary = () =>
{
      setShow(false)
}

async function returnToForm(e) {
  e.preventDefault();
}

//Modal-Crosswalk
const closeModalPrimaryEditEmployee = (schoolName) =>
  {
        setshowMEditEmp(false)
        ReLoadCrosswalkEntries(formData.SchoolName)
  }
  
  async function returnToFormEditEmployee(e) {
    e.preventDefault();
  }
  


 const deleteRecordAndRefresh = async (_EmployeeID,_Position,_SchoolName,e) =>{
      
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure you want to delete this item !")) {
        formData.EmployeeID = _EmployeeID;
        formData.Position = _Position;
        formData.SchoolName = _SchoolName;
        console.log(formData)
        await DeleteCrosswalkRecord(formData)
        LoadCrosswalkEntries(e,_SchoolName)
      } else {
         
      }
  }

  const EditRecordAndRefresh = async (_EmployeeID,_Position,_SchoolName,e) =>{
      
    formData.EmployeeID = _EmployeeID;
      setEmployeeIDEdit(_EmployeeID);

      formData.SchoolName = _SchoolName;
      setSchoolNameEmpEdit(_SchoolName)

      formData.Position = _Position;
      setPositionEdit(_Position)
      
      setTimeout(() => {  setshowMEditEmp(true); }, 500);

      
      //const [_EmployeeIDEdit, setEmployeeIDEdit] = useState('');
      //const [_SchoolNameEdit,setSchoolNameEmpEdit]= useState('');

}


    function CellFormatterDelete(cell, row) {
      return (
          <div>
              <Trash onClick={(e) => deleteRecordAndRefresh(row.EmployeeID,row.Position,row.SchoolName,e)} />
          </div>
      );
  }

  function CellFormatterEdit(cell, row) {
    return (
        <div>
            <Pencil onClick={(e) => EditRecordAndRefresh(row.EmployeeID,row.Position,row.SchoolName,e)} />
        </div>
    );
}


  const EmployeeFilter = () => textFilter({
    placeholder: 'All or Part of EmployeeID',  // custom the input placeholder
    className: 'my-custom-text-filter', // custom classname on input
    defaultValue: '', // default filtering value
    caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    delay: 1000, // how long will trigger filtering after user typing, default is 500 ms
  });
  
const  columnsCrossWalk= [
  {
    dataField: 'EmployeeID',
    text: '',
    sort: true,
    filter : EmployeeFilter()
 },
  {
    dataField: 'Position',
    text: 'Position',
    sort: true
 },
  {
      dataField: 'SchoolName',
      text: 'SchoolName',
      sort: true
  },
  {
    dataField: 'DateAdded',
    text: 'DateAdded',
    sort: true
},
{
  dataField: 'CRecordID',
  text: '',
  formatter: CellFormatterEdit,
  style: { width: '10px' },
  sort: true
},
{
  dataField: '',
  text: '',
  formatter: CellFormatterDelete,
  style: { width: '10px' },
  sort: true
},
 
];

const  columnsEmployeeTableData= [
  {
    dataField: 'EmployeeID',
    text: '',
    sort: true,
    filter : EmployeeFilter()
},
{
  dataField: 'EmployeeName',
  text: 'EmployeeName',
  sort: true,
},
{
  dataField: 'SchoolName',
  text: 'SchoolName',
},
  {
    dataField: 'Role',
    text: 'Role',
    sort: true
 },
  {
    dataField: 'Certification',
    text: 'Certification',
    sort: true
},
{
  dataField: 'CrossWalked',
  text: 'CrossWalked',
  sort: true
}
];

//for the color picker
//https://imagecolorpicker.com/color-code/a41364

//explains how the box shadow is applied
//https://css-tricks.com/almanac/properties/b/box-shadow/

const rowStyle = {  height: '10px', padding: '2px 0' };

  return (
    <div>
      <Container>
    <Card 
      style={{boxShadow: "-5px 5px  lightblue",marginTop:"100px"}}>
      <Card.Body>
        <Card.Title>Assign Crosswalk Positions</Card.Title>
        <Form>
          <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Label>
                School
              </Form.Label>
              <SchoolListDropDown
                handleChange={(e) => handleChange_SchoolChange(e)}
                id="ddSchoolListings"
                name="SchoolName"
                value={SchoolName}

              />
            </Col>
            <Col sm={3} className="my-1">
              <Form.Label>Select EmployeeID</Form.Label>
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
                style={{ width: 300 }}
                name="EmployeeID"
                id="ddEmployeeIDs"
                onChange={(e) => handleChange_EmployeeID(e)}
              ></select>
            </Col>
            <Col xs="auto" className="my-1">
              <Form.Label>Unassigned Positions</Form.Label>

              <PositionListDropDown
                id="ddPositions"
                name="Position"
                value={Position}
                handleChange={(e) => handleChange_DDPositions(e)}
              />
            </Col>
            <Col xs="auto" className="my-1">
              <Button
                variant="primary"
                type="button"
                id="btnSubmitPosition"
                style={myStyles.buttonSearch}
                disabled={btnAssignDisable}
                onClick={(e) => writeAndFetchCrosswalkEntries(e)}
              >
                Assign
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>

    <Card
    style={{boxShadow: "-5px 5px  lightblue",marginTop:"30px"}}>
      <Card.Body>
      <Card.Title>Employee Details</Card.Title>
      <Form>
                    <Row>
                        <Col sm={12}>
                        
                          <ToolkitProvider
                            keyField="EmployeeID"
                            data={tblSearchResultsAllEmployeeData}
                            columns={columnsEmployeeTableData}
                            exportCSV={{
                              onlyExportFiltered: true,
                              exportAll: false,
                            }}
                          >
                            {(props) => (
                              <div>
                                {/*<MyExportCSV {...props.csvProps} /> */}
                                <hr />
                                <BootstrapTable
                                  {...props.baseProps}
                                  striped
                                  hover
                                  pagination={paginationFactory({
                                    showTotal: true,
                                    firstPageText: "First",
                                    lastPageText: "Last",
                                  })}
                                  rowStyle={rowStyle}
                                  filter={filterFactory()}
                                />
                              </div>
                            )}
                          </ToolkitProvider>
                        </Col>
                      </Row>
                    </Form>
      </Card.Body>
    </Card>

    <Accordion defaultActiveKey="0"
     style={{marginTop:"30px"}}>
    <Accordion.Item eventKey="0">
    <Accordion.Header>Crosswalked Positions</Accordion.Header>
    <Accordion.Body>
    <Card
    style={{boxShadow: "-5px 5px lightblue",marginTop:"30px"}}>
      <Card.Body>
      <Card.Title></Card.Title>
      <Row>
                        <Col sm={12}>
                        

                          <ToolkitProvider
                            keyField="CRecordID"
                            data={tblSearchResultsCrossWalkData}
                            columns={columnsCrossWalk}
                            exportCSV={{
                              onlyExportFiltered: true,
                              exportAll: false,
                            }}
                          >
                            {(props) => (
                              <div>
                                {/*<MyExportCSV {...props.csvProps} /> */}
                                <hr />
                                <BootstrapTable
                                  {...props.baseProps}
                                  striped
                                  hover
                                  pagination={paginationFactory({
                                    showTotal: true,
                                    firstPageText: "First",
                                    lastPageText: "Last",
                                  })}
                                  rowStyle={rowStyle}
                                  filter={filterFactory()}
                                />
                              </div>
                            )}
                          </ToolkitProvider>
                        </Col>
                      </Row>
      </Card.Body>
    </Card>
    </Accordion.Body>
    </Accordion.Item>
    </Accordion>

    <Row>
         <Col sm={12}>
         <ModalForEditEmployee
                      actionLabel = ""
                      title = "Edit Employee Record"
                      showPrimaryModal={showMEditEmp}
                      EmployeeID = {_EmployeeIDEdit}
                      SchoolName= {_SchoolNameEdit}
                      Position= {_PositionEdit}
                      close="Close"
                      Submit="Place Holder"
                      RefreshPositionList="Refresh Positon List"
                      handleChange_DDPositionsEditEmployee={(e) => handleChange_DDPositionsEditEmployee}
                      handleClickOne={(e) => returnToFormEditEmployee}
                      handleClosePrimary={() => closeModalPrimaryEditEmployee}
                      handleChange={(e) => onChangeEditEmployeeModal}

                    />
         </Col>
         </Row>
    </Container>
    </div>
  );
};

const myStyles = {
    listgroupItems: {
        marginRight: "50px",
        background:"#67a2b9",
        border:"0"
    },
    hyperlinkStyle: {
        textDecoration:"none",
        color:"white"
    },
    buttonSearch: {
     
      marginTop:"20px"
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps,{fetchCrosswalkEntryData,
                                        AddOrUpdateCrosswalkRecord,
                                        fetchCrosswalkEntriesFilteredBySchool,
                                        DeleteCrosswalkRecord,
                                        checkForDuplicateCrosswalkRecord,
                                        fetchEmployeeData,
                                        fetchEmployeeIDSBySchoolName,
                                        UpdateCrosswalkRecord})(CrossWalkNewDesign);
