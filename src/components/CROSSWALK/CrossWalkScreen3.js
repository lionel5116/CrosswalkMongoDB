import React, { useState,useEffect} from 'react';
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Stack from 'react-bootstrap/Stack';
import { Tab ,Tabs} from 'react-bootstrap';


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


export const CrossWalkScreen3 = ({fetchCrosswalkEntryData,
                          AddOrUpdateCrosswalkRecord,
                          fetchCrosswalkEntriesFilteredBySchool,
                          DeleteCrosswalkRecord,
                          checkForDuplicateCrosswalkRecord,
                          fetchEmployeeData,
                          fetchEmployeeIDSBySchoolName}) => {


   

  const [tblSearchResultsCrossWalkData, setSearchResultsCrossWalkData] = useState([])
  const [tblSearchResultsAllEmployeeData, setSearchResultsAllEmployeeData] = useState([])
  const [tblSearchEmpIDsBySchoolName, setSearchEmpIDsBySchoolName] = useState([])
  const [btnAssignDisable,setBtnAssignDisable] = useState(true)


  //for modal
  const [show, setShow] = useState(false);
  const [_EmployeeID, setEmployeeID] = useState(0);

  const [_SchoolNameDescription, setSchoolName] = useState('');
  const [_EmployeeName, setEmployeeName] = useState('');
  const [_Role, setRole] = useState('');
  const [_Cert, setCert] = useState('');

  

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
function handleChange_DDPositions (e){
      e.preventDefault();
      setFormData({...formData, [e.target.name]: e.target.value});
      checkForAssignButtonEnability(e)
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

   /*
   console.log(_ddSchoolListings.value)
   console.log(_ddPositions.value)
   console.log(_ddEmployeeIDs.value)
   */

  
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

function handleChange_EmployeeID (e){
      e.preventDefault();
      setFormData({...formData, [e.target.name]: e.target.value});
      fetchEmployeeDetails(e, e.target.value)
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

    function CellFormatter(cell, row) {
      return (
          <div>
              <Trash onClick={(e) => deleteRecordAndRefresh(row.EmployeeID,row.Position,row.SchoolName,e)} />
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
    text: 'EmployeeID',
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
  formatter: CellFormatter,
  style: { width: '10px' },
  sort: true
},
 
];

const  columnsEmployeeTableData= [
  {
    dataField: 'EmployeeID',
    text: 'EmployeeID',
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



const rowStyle = {  height: '10px', padding: '2px 0' };

  return (
    <div>
      <main>
        <Container>
          <Row>
            <Col sm={12} style={{ background: "#67a2b9" }} className="my-4">
              <Image src={CROSSWALK_LOGO} fluid />
            </Col>
          </Row>
          <Col sm={12}>
            <label style={{ width: 500, fontSize: 65 }}>
              CROSSWALK SCREEN THREE
            </label>
          </Col>
          <Row></Row>

          <Row>
            <Row>
              <Col>
                <label style={{ width: 110 }}>Select School</label>

                <SchoolListDropDown
                  handleChange={(e) => handleChange_SchoolChange(e)}
                  id="ddSchoolListings"
                  name="SchoolName"
                  value={SchoolName}
                  //onChange={(e) => onChange(e)}
                />
              </Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <hr></hr>
            <Tabs>
              <Tab
                eventKey="SchoolSpecificEmployee"
                title="School Specific Employee"
              >
                <Card>
                  <Card.Body>
                    <Card.Title>Enter Crosswalk Position(s)</Card.Title>
                    <Form>
                      <Row className="mb-3">
                        <label
                          style={{ fontWeight: "bold", color: "blue" }}
                        ></label>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col}>
                          <Form.Label>Select EmployeeID</Form.Label>
                          <select
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            style={{ width: 300 }}
                            name="EmployeeID"
                            id="ddEmployeeIDs"
                            onChange={(e) => handleChange_EmployeeID(e)}
                          ></select>
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Employees</Form.Label>
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
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group as={Col}>
                          <Form.Label>Unassigned Positions</Form.Label>

                          <PositionListDropDown
                            id="ddPositions"
                            name="Position"
                            value={Position}
                            handleChange={(e) => handleChange_DDPositions(e)}
                          />
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group className="mb-3" controlId="txtEmpDetails">
                          <Stack
                            direction="horizontal"
                            gap={3}
                            style={{ border: "noe" }}
                          >
                            <div
                              className="p-2"
                              style={{ fontWeight: "bold", color: "green" }}
                            >
                              {_EmployeeName}
                            </div>
                            <div
                              className="p-2"
                              style={{ fontWeight: "bold", color: "green" }}
                            >
                              {_Role}
                            </div>
                            <div
                              className="p-2"
                              style={{ fontWeight: "bold", color: "red" }}
                            >
                              {_Cert}
                            </div>
                          </Stack>
                        </Form.Group>
                      </Row>

                      <Row>
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

                        {/*}
                    <Button
                      variant="warning"
                      type="button"
                      id="btnFetchEmployeeIDS"
                      style={myStyles.buttonSearch}
                      disabled 
                      onClick={(e) => fetchEmployeeIDs(e)}
                    >
                      Test Fetching
                    </Button>
                    */}
                      </Row>

                      <br></br>

                      <Row>
                        <Col sm={12}>
                          <h2>Crosswalked Positions</h2>

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

                      <Row>
                        <Col sm={12}></Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab
                eventKey="PlaceHolder"
                title="PlaceHolder Tab"
              >
                <Card>
                  <Card.Body>
                    <Card.Title>Employee Details</Card.Title>
                    <Form></Form>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab
                eventKey="CustomEmployee"
                title="Custom Employee Assignment"
              ></Tab>
            </Tabs>
          </Row>

          <Row>
            <Col sm={12}>
              <ModalForRecordSearch
                actionLabel="View"
                title="Record Details"
                showPrimaryModal={show}
                close="Close"
                Submit="Place Holder"
                handleClosePrimary={() => closeModalPrimary}
                handlechange={() => onChange}
              />
            </Col>
          </Row>

          <Row style={{ marginTop: "10px" }}>
            <Col sm={12}>2024-2025 Houston Independent School district</Col>
          </Row>
        </Container>
      </main>
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
      marginLeft:"14px",
      width:"300px",
      marginBottom:"10px"
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps,{fetchCrosswalkEntryData,
                                        AddOrUpdateCrosswalkRecord,
                                        fetchCrosswalkEntriesFilteredBySchool,
                                        DeleteCrosswalkRecord,
                                        checkForDuplicateCrosswalkRecord,
                                        fetchEmployeeData,
                                        fetchEmployeeIDSBySchoolName})(CrossWalkScreen3);
