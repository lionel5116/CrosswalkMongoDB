import React, { useState,useLayoutEffect} from 'react';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import { connect } from "react-redux";
import { setAlert } from '../../actions/alert';

//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';


import { Hr, Trash } from 'react-bootstrap-icons';
import { Pencil } from 'react-bootstrap-icons';
import { PlusCircleFill } from 'react-bootstrap-icons';

import "react-datepicker/dist/react-datepicker.css";


//this is used in the reusable control SchoolListDropdown.js
import SchoolListDropDown from '../reusable/SchoolListDropDown'
import { fetchCrosswalkEntryData } from '../../actions/crosswalk';
import { AddOrUpdateCrosswalkRecord } from '../../actions/crosswalk';
import { fetchCrosswalkEntriesFilteredBySchool } from '../../actions/crosswalk';
import { DeleteCrosswalkRecord } from '../../actions/crosswalk';
import { checkForDuplicateCrosswalkRecord } from '../../actions/crosswalk';
import { fetchEmployeeData } from '../../actions/crosswalk';
import { fetchEmployeeIDSBySchoolName } from '../../actions/crosswalk';
import { fetchAllEmployeeDataBySchoolName } from '../../actions/crosswalk';
import ModalForEditEmployee from '../GenericModal/ModalForEditEmployee';
import ModalForEditEmployeeAddPosition from '../GenericModal/ModalForEditEmployeeAddPosition';
import { UpdateCrosswalkRecord } from '../../actions/crosswalk';
import AlertModal from '../GenericModal/AlertModal';
import studentInfoApi from '../../api/studentInfoAPI';



export const CrossWalkNewDesignWorking = ({fetchCrosswalkEntryData,
                          AddOrUpdateCrosswalkRecord,
                          fetchCrosswalkEntriesFilteredBySchool,
                          DeleteCrosswalkRecord,
                          checkForDuplicateCrosswalkRecord,
                          fetchEmployeeData,
                          fetchEmployeeIDSBySchoolName,
                          fetchAllEmployeeDataBySchoolName,
                          UpdateCrosswalkRecord,
                          setAlert}) => {




  const [tblSearchResultsAllEmployeeData, setSearchResultsAllEmployeeData] = useState([])
  const [tblSearchPositionData, setSearchPositionData] = useState([])

  //for modal(s)
  const [showMEditEmp, setshowMEditEmp] = useState(false);
  const [showModalAddEmpPosition, setshowModalAddEmpPosition] = useState(false);
  const [showAlertModal,setShowAlertModal] = useState(false)
  const [_EmployeeIDEdit, setEmployeeIDEdit] = useState('');
  const [_SchoolNameEdit,setSchoolNameEmpEdit]= useState('');
  const [_PositionEdit,setPositionEdit]= useState('');

  const [_Certification,setCertification]= useState('');
  const [_Eligibility,setEligibility]= useState('');

  const [_EmployeeID, setEmployeeID] = useState('');
  const [_Position, setPosition] = useState('');




useLayoutEffect(() => {
    document.body.style.backgroundColor = "#e1ecef"
});



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
 


const onChangeEditEmployeeModal = e => setFormData({...formData, [e.target.name]: e.target.value});


function handleChange_DDPositionsEditEmployee (e){
  e.preventDefault();
  setFormData({...formData, [e.target.name]: e.target.value});
  
}

function handleChange_SchoolChange (e){
      const { value } = e.target;
      e.preventDefault();
      setFormData({...formData, [e.target.name]: e.target.value});
      AllEmployeesFilteredBySchool(e,value)
      fetchUnassignedPositions(e)
}




//COMMIT,REFRESH,FETCH OPERATIONS

const ReloadEmployeeData = async() => {
  let _FETCH_DATA = [];
  setSearchResultsAllEmployeeData([])
  var _ddSchoolListings = document.getElementById('SchoolName');
  //console.log(_ddSchoolListings.value)

  _FETCH_DATA = await fetchEmployeeIDSBySchoolName(_ddSchoolListings.value);

  if(_FETCH_DATA !== null)
  {

    setSearchResultsAllEmployeeData(_FETCH_DATA)

  }
  else {  //do nothing, no schools found
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
//END COMMIT,REFRESH,FETCH OPERATIONS



//MODAL ACTIONS - CALLBACK AND REFRESH METHODS ****
const closeModalPrimaryEditEmployee = (schoolName) =>
  {
        setshowMEditEmp(false)
        
       
        //this is for the primary grid
        ReloadEmployeeData() //leveraging**
  }

  const closeModalPrimaryAddEmployee = (schoolName) =>
    {
           setshowModalAddEmpPosition(false)
           ReloadEmployeeData()
    }
  
  async function returnToFormEditEmployee(e) {
    e.preventDefault();
  }
  
 const deleteRecordAndRefresh = async (_EmployeeID,_Position,e) =>{
      
      // eslint-disable-next-line no-restricted-globals
      /*
      if (confirm("Are you sure you want to delete this item !")) {

        formData.EmployeeID = _EmployeeID;
        formData.Position = _Position;
        formData.SchoolName = document.getElementById('SchoolName').value;
        console.log(formData)
        await DeleteCrosswalkRecord(formData)
        ReloadEmployeeData()
        //LoadCrosswalkEntries(e,_SchoolName)
        setAlert("Staff Crosswalk record deleted","danger")
      } else {
         setAlert("Staff Crosswalk record not deleted","warning")
      }
         */
      setEmployeeID(_EmployeeID)
      setPosition(_Position)
      setShowAlertModal(true);  
  }


  const confirmDeleteAndRefresh = async() =>{
        formData.EmployeeID = _EmployeeID;
        formData.Position = _Position;
        formData.SchoolName = document.getElementById('SchoolName').value;
        //console.log(formData)
        await DeleteCrosswalkRecord(formData)
        ReloadEmployeeData()
        setAlert("Staff Crosswalk record deleted","danger")
  }

  //*******ALERT MODAL ACTIONS*** *//
  const handleOKClick = () => {

    confirmDeleteAndRefresh()
    setShowAlertModal(false);
    
  };
  const handleNoClick = () => {
    setShowAlertModal(false);
  };
  const handleCloseAlertClick = () => {
    setShowAlertModal(false);
  };
    //*****END ALERT MODAL ACTIONS***** *//



const EditRecordAndRefreshFromAddNewRecord = async (_EmployeeID,_Position,_Certification,_Eligibility) =>{
      
  formData.EmployeeID = _EmployeeID;
  setEmployeeIDEdit(_EmployeeID);


  setSchoolNameEmpEdit(document.getElementById('SchoolName').value)

  formData.Position = _Position;
  setPositionEdit(_Position)

  setCertification(_Certification)
  setEligibility(_Eligibility)

  setshowMEditEmp(true)
  

}

const AddCrossWalkPositionAndRefresh = async (_EmployeeID,_Position,_SchoolName,_Certification,_Eligibility,e) =>{
      
    formData.EmployeeID = _EmployeeID;
    setEmployeeIDEdit(_EmployeeID);

    formData.SchoolName = _SchoolName;
    setSchoolNameEmpEdit(_SchoolName)

    formData.Position = _Position;
    setPositionEdit(_Position)

    setCertification(_Certification)
    setEligibility(_Eligibility)

    setshowModalAddEmpPosition(true)
    

}
//END MODAL ACTIONS - CALLBACK AND REFRESH METHODS


/*CELL FORMATTER METHODS */
function CellFormatterDelete(cell, row) {
      return (
          <div>
              <Trash onClick={(e) => deleteRecordAndRefresh(row.EmployeeID,row.Position,row.SchoolName,e)} />
          </div>
      );
  }


function CellFormatterEditEmpDetails(cell, row) {
  return (
      <div>
          <Pencil onClick={(e) => EditRecordAndRefreshFromAddNewRecord(row.EmployeeID,row.Position,row.Certification,row.Eligibility,e)} />
      </div>
  );
}

function CellFormatterAddPosition(cell, row) {
  if( row.CrossWalked === 'YES') {

  }
  else {
    return (
     
      <div>
          <PlusCircleFill onClick={(e) => AddCrossWalkPositionAndRefresh(row.EmployeeID,row.Role,row.SchoolName,row.Certification,row.Eligibility,e)} />
      </div>
  );
  }
}
/*END CELL FORMATTER METHODS */



/*GRID COLUMN FILTERS AND COLUMN DEFINITION*/
const EmployeeFilter = () => textFilter({
    placeholder: 'All or Part of EmployeeID',  // custom the input placeholder
    className: 'my-custom-text-filter', // custom classname on input
    defaultValue: '', // default filtering value
    caseSensitive: false, // default is false, and true will only work when comparator is LIKE
    delay: 1000, // how long will trigger filtering after user typing, default is 500 ms
  });



const  columnsEmployeeTableData= [
  {
    dataField: 'EmployeeID',
    text: '',
    sort: true,
    filter : EmployeeFilter(),
    style: {backgroundColor:'yellow',fontSize:'12px',width: '100px',fontWeight:'bold'}
},
{
  dataField: 'EmployeeName',
  text: 'EmployeeName',
  style:{fontSize:'13px'},
  sort: true,
},
  {
    dataField: 'Role',
    text: 'Role',
    style:{fontSize:'13px'},
    sort: true
 },
{
  dataField: 'Position',
  text: 'Position',
  style:{fontSize:'13px'},
  sort: true
},
{
  dataField: 'Certification',
  text: 'Certification',
  style:{fontSize:'13px'},
  sort: true
},
{
  dataField: 'Eligibility',
  text: 'Eligibility',
  style:{fontSize:'13px'},
  sort: true
},
{
  dataField: 'CrossWalked',
  text: 'CrossWK',
  style:{fontSize:'13px',width: '75px'},
  sort: true
},
{
  dataField: '1',
  text: '',
  formatter: CellFormatterAddPosition,
  style: { width: '10px' },
  sort: true
},
{
  dataField: '2',
  text: '',
  formatter: CellFormatterEditEmpDetails,
  style: { width: '10px' },
  sort: true
},
{
  dataField: '3',
  text: '',
  formatter: CellFormatterDelete,
  style: { width: '10px' },
  sort: true
},
];

const  columnPositionData= [
{
  dataField: 'PositionName',
  text: 'Position',
  style:{fontSize:'14px'},
  sort: true
},
];

//for the color picker
//https://imagecolorpicker.com/color-code/a41364

//explains how the box shadow is applied
//https://css-tricks.com/almanac/properties/b/box-shadow/

const rowStyle = {  height: '10px', padding: '2px 0' };

/*END GRID COLUMN FILTERS AND COLUMN DEFINITION  */


/*POSITION DROPDOWN METHODS */

const filterPositionGrid = (e) => {

  var selectedPType = document.getElementById('ddPositions').value
  e.preventDefault();
  switch (selectedPType) {
    case "All":
      fetchAllPositions(e);
      break;
    case "Unassigned":
      fetchUnassignedPositions(e);
      break;
    case "Assigned":
      fetchAssignedPositions(e);
      break;
    default:
      fetchAllPositions(e);
  }
};

//fetchPositons is always "Filtered for all that have not been assigned - Available positions"
  async function fetchUnassignedPositions(e) {   
      
        setSearchPositionData([])
        let _POSITION_DATA = [];
        var myAPI = new studentInfoApi();
        _POSITION_DATA = await myAPI.fetchPositions();
        setSearchPositionData(_POSITION_DATA)
 
  }

  async function fetchAllPositions(e) {   
      
    setSearchPositionData([])
    let _POSITION_DATA = [];
    var myAPI = new studentInfoApi();
    _POSITION_DATA = await myAPI.fetchAllPositions();
    setSearchPositionData(_POSITION_DATA)

}

async function fetchAssignedPositions(e) {   
      

  setSearchPositionData([])
  let _POSITION_DATA = [];
  var myAPI = new studentInfoApi();
  _POSITION_DATA = await myAPI.AssignedPositions();
  setSearchPositionData(_POSITION_DATA)
}

/*END POSITION DROPDOWN METHODS */


  return (
    <div>
      <Container>
        
        <Card style={{ boxShadow: "-5px 5px  #78Acc0", marginTop: "50px" }}>
          <Card.Body>
            <Card.Title>Select School</Card.Title>
            <Form>
              <Row className="align-items-center">
                <Col sm={3} className="my-1">
                  <Form.Label>Division</Form.Label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue={"-select-"}>-select-</option>
                    <option value="Central">Central</option>
                    <option value="NORTH">NORTH</option>
                    <option value="SOUTH">SOUTH</option>
                    <option value="WEST">WEST</option>
                  </select>
                </Col>

                <Col sm={3} className="my-1">
                  <Form.Label>Unit</Form.Label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue={"-select-"}></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </Col>

                <Col sm={3} className="my-1">
                  <Form.Label>School</Form.Label>
                  <SchoolListDropDown
                    handleChange={(e) => handleChange_SchoolChange(e)}
                    id="ddSchoolListings"
                    name="SchoolName"
                    value={SchoolName}
                  />
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        <Card style={{ boxShadow: "-5px 5px   #78Acc0", marginTop: "30px" }}>
          <Card.Body>
            <Card.Title>Employee Details</Card.Title>
            <Form>
              <Row>
                <Col sm={9}>
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
                <Col sm={3}>
                  <ToolkitProvider
                    keyField="Position"
                    data={tblSearchPositionData}
                    columns={columnPositionData}
                    exportCSV={{
                      onlyExportFiltered: true,
                      exportAll: false,
                    }}
                  >
                    {(props) => (
                      <div>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          id='ddPositions'
                          onChange={(e) => filterPositionGrid(e)}
                        >
                          <option value="Unassigned">Unassigned</option>
                          <option value="All">All</option>
                          <option value="Assigned">Assigned</option>
                        </select>
                        <hr></hr>
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

        <Row>
          <Col sm={12} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="primary"
              type="button"
              id="btnSave"
              style={{ marginTop: "10px" }}
            >
              NEXT STEP
            </Button>
          </Col>
        </Row>

        <Row>
          <Col sm={12}>
            <ModalForEditEmployee
              actionLabel=""
              title="Edit Employee Record"
              showPrimaryModal={showMEditEmp}
              EmployeeID={_EmployeeIDEdit}
              SchoolName={_SchoolNameEdit}
              Position={_PositionEdit}
              Certification={_Certification}
              Eligibility={_Eligibility}
              close="Close"
              Submit="Place Holder"
              RefreshPositionList="Refresh Positon List"
              handleChange_DDPositionsEditEmployee={(e) =>
                handleChange_DDPositionsEditEmployee
              }
              handleClickOne={(e) => returnToFormEditEmployee}
              handleClosePrimary={() => closeModalPrimaryEditEmployee}
              handleChange={(e) => onChangeEditEmployeeModal}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <ModalForEditEmployeeAddPosition
              actionLabel=""
              title="Add Crosswalk Position"
              showPrimaryModal={showModalAddEmpPosition}
              EmployeeID={_EmployeeIDEdit}
              SchoolName={_SchoolNameEdit}
              Position={_PositionEdit}
              Certification={_Certification}
              Eligibility={_Eligibility}
              close="Close"
              Submit="Place Holder"
              RefreshPositionList="Refresh Positon List"
              handleChange_DDPositionsEditEmployee={(e) =>
                handleChange_DDPositionsEditEmployee
              }
              handleClosePrimary={() => closeModalPrimaryAddEmployee}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <AlertModal
              actionLabel=""
              title="Are you sure you want to delete this crosswalk record ?.."
              showAlertModal={showAlertModal}
              Ok="Ok"
              No="No"
              Close="Close"
              handleOKClick={() => handleOKClick}
              handleNoClick={() => handleNoClick}
              handleCloseAlertClick={() => handleCloseAlertClick}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

/*
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
    */

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps,{fetchCrosswalkEntryData,
                                        AddOrUpdateCrosswalkRecord,
                                        fetchCrosswalkEntriesFilteredBySchool,
                                        DeleteCrosswalkRecord,
                                        checkForDuplicateCrosswalkRecord,
                                        fetchEmployeeData,
                                        fetchEmployeeIDSBySchoolName,
                                        fetchAllEmployeeDataBySchoolName,
                                        UpdateCrosswalkRecord,setAlert})(CrossWalkNewDesignWorking);
