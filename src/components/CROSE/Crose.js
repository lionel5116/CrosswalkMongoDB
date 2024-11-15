import React, { useState,useRef,useEffect } from 'react';
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { connect } from "react-redux";

import { getCroseVendorData } from "../../actions/crose";
//import { getCroseVendorList } from "../../actions/crose";
import ListGroup from 'react-bootstrap/ListGroup';
//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
//import HISDSEAL from '../../images/HISDSEAL.PNG';



import { BinocularsFill } from 'react-bootstrap-icons';

import ModalForRecordSearch from '../GenericModal/ModalForRecordSearch';


import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";

import { useNavigate } from "react-router-dom";


import CROSE_LOGO from "../../images/CROSE_LOGO.PNG";

export const Crose = ({ getCroseVendorData }) => {
  
  const [tblSearchResults, setSearchResults] = useState([])
  const [tblSearchResultsFiltered, setSearchResultsFiltered] = useState([])
  const [tblSearchResultsDistinct, setSearchResultsDistinct] = useState([])

  const[_VendorNumber,setVendorNumber] = useState("____");
  const[_VendorName,setVendorName] = useState("____");
  const[_ClearDate,setClearDate] = useState("____");
  const[_Amount,setAmount] = useState("____");


  //for modal
  const [show, setShow] = useState(false);

  //const myRef = useRef(null);
  const navigate = useNavigate();

  function handleKeyDown(event) {
      if (event.key === "Enter"){
       // alert('Enter key was pressed');
        var btnSearchButton = document.getElementById('btnSearchButton');
        btnSearchButton.click();
      }
  }


    const [formData, setFormData] = useState({
        VendorNumber: "",
        VendorName: "",
        StartDate:"",
        EndDate: ""
      });

      const {
        VendorNumber,
        VendorName,
        StartDate,
        EndDate,
        
      } = formData;

      //const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
      const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    function isDateValid(dateStr) {
      return !isNaN(new Date(dateStr));
    }

      const searchRecords = async (e) => {
        e.preventDefault();


        formData.SearchType = "";
        
        //make sure you store the date values

        setSearchResults([]);
        setSearchResultsFiltered([])
        setSearchResultsDistinct([])

        let dateObj = new Date(formData.StartDate);
        let dateObj2 = new Date(formData.EndDate);
 
        console.log(isDateValid(dateObj));
        console.log(isDateValid(dateObj2));
        
     
        console.log(formData);
  
      if(formData.VendorName !== "" 
        && formData.StartDate !==""
        && formData.EndDate !== ""
        && formData.VendorNumber === ""
       ) {
        
        if(isDateValid(dateObj)   
           && isDateValid(dateObj2) ) {
            //formData.StartDate = formatter.format(StartDate);
            //formData.EndDate = formatter.format(EndDate);
          } else {
            window.alert(" Invalid date format ") 
            return;
        }

        //SEARCH BY VENDOR NAME AND DATE RANGE
        console.log("Searching by Vendor Name and Date Range");
        if (dateObj2 >  dateObj ) {
          formData.StartDate = moment(dateObj).toDate().toUTCString()
          formData.EndDate = moment(dateObj2).toDate().toUTCString()
        }
        else if (moment(dateObj).toDate().toUTCString() === moment(dateObj2).toDate().toUTCString()) {
          formData.StartDate = moment(dateObj).toDate().toUTCString()
          formData.EndDate = moment(dateObj2).toDate().toUTCString()
        }
        else 
        {
          window.alert(" Invalid date range ");
          return;
        }

        formData.SearchType = "VendorNameDate"
     
      }
      else if (formData.VendorNumber !== "" 
      && formData.StartDate !==""
      && formData.EndDate !== ""
      && formData.VendorName === "") {

      
       //SEARCH BY VENDOR NUMBER AND DATE RANGE
       console.log("Searching by Vendor Number and Date Range");

       if (dateObj2 >  dateObj ) {
        formData.StartDate = moment(dateObj).toDate().toUTCString()
        formData.EndDate = moment(dateObj2).toDate().toUTCString()
      }
      else if (moment(dateObj).toDate().toUTCString() === moment(dateObj2).toDate().toUTCString()) {
        formData.StartDate = moment(dateObj).toDate().toUTCString()
        formData.EndDate = moment(dateObj2).toDate().toUTCString()
      }
      else 
      {
        window.alert(" Invalid date range ");
        return;
      }

     

       formData.SearchType = "VendorNumberDate"
      }
      else if (formData.VendorName !== "" 
        && formData.StartDate === ""
        && formData.EndDate === ""
        && formData.VendorNumber === "") {
        //SEARCH BY VENDOR NAME ONLY
        console.log("Searching by Vendor Name only ");
        formData.SearchType = "VendorName"
      }
      else if (formData.VendorName ===  "" 
        && formData.StartDate === ""
        && formData.EndDate === ""
        && formData.VendorNumber !== "") {
        //SEARCH BY VENDOR NUMBER ONLY
        console.log("Searching by Vendor Number only ");
        formData.SearchType = "VendorNumber"
      }
      else if (formData.VendorName !==  "" 
      && formData.StartDate !== ""
      && formData.EndDate !== ""
      && formData.VendorNumber !== "") {
        //clearSearchFields();
        window.alert("Search options: Vendor# | Vendor Name | Vendor# + Date Range | Vendor Name  + Date Range ");
        return;
     }
      else {
        //window.alert("Search options: Vendor# | Vendor Name | Vendor# + Date Range | Vendor Name  + Date Range ");
        return;
      }


        let _SEARCH_DATA = [];

       
        try {
            _SEARCH_DATA = await getCroseVendorData(formData);
      
           if(_SEARCH_DATA !== null)
           {
            setSearchResults(_SEARCH_DATA)
            setSearchResultsDistinct(fetchDistinctRowsFromSearchResults(_SEARCH_DATA))
            clearSearchFieldsDates();
           }
           else {
            clearSearchFieldsDates();
            setSearchResults([]);
            setSearchResultsFiltered([])
            setSearchResultsDistinct([])
           }

         
        }
        catch (err) {
            console.log(err)
            setSearchResults([]);
        }
        
      
    }

    const fetchDistinctRowsFromSearchResults =(_SEARCH_DATA_) => {
       const result = [];
        const map = new Map();
        for (const item of _SEARCH_DATA_) {
            if(!map.has(item.VendorNumber)){
                map.set(item.VendorNumber, true);    // set any value to Map
                result.push({
                    random: item.random,
                    VendorNumber: item.VendorNumber,
                    CheckDate: item.CheckDate,
                    Name: item.Name
                });
            }
        }
        return result;
  
    }


    const clearSearchFieldsDates = () => {
      formData.StartDate  = ""
      formData.EndDate  = ""
     
    }

    const exportVendorList = () => {
      navigate("/VendorExport");
    }

     /*MODAL ACTIONS */
  const closeModalPrimary = () =>
  {
      setShow(false)
    
  }

  
  function handleChange (e){
    const { VendorNumber, VendorName ,StartDate,EndDate} = e.target;
    e.preventDefault();
  }
    
  
  async function returnToForm(e) {
    e.preventDefault();
  }
 
    function showRowDetailInfo(_VendorName,_VendorNumber,_ClearDate,_Amount) {

      setVendorName(_VendorName)
      setVendorNumber(_VendorNumber)
      setClearDate(_ClearDate)
      setAmount(_Amount)
      setSearchResultsFiltered(tblSearchResults.filter( function(vendorNum) {
        return vendorNum.VendorNumber === _VendorNumber }))

      setShow(true);
  }

    function CellFormatter(cell, row) {
      return (
          <div>
              <BinocularsFill onClick={() => showRowDetailInfo(row.Name,row.VendorNumber,row.CheckDate,row.Amount)} />
          </div>
      );
  }

  
  
const columnsProduction = [
  {
    dataField: 'random',
    text: '',
    formatter: CellFormatter,
    style: { width: '10px' },
    sort: true
},
  {
    dataField: 'VendorNumber',
    text: 'Vendor Number',
    sort: true
 },
  {
      dataField: 'Name',
      text: 'Vendor Name',
      sort: true
  },
 
];


const rowStyle = {  height: '10px', padding: '2px 0' };

  return (
    <div>
      <main>
        <Container>
          
          
          <Row>
            <Col sm={12} style={{background:'#67a2b9'}} className='my-4'>
            <Image
                src={CROSE_LOGO}
                fluid
              />
            </Col>
          
          </Row>

          <Row>
             <Row>
                    <Button
                      variant="warning"
                      type="button"
                      id="btnVendor List"
                      style={myStyles.buttonSearch}
                      onClick={(e) => exportVendorList(e)}
                    >
                      Vendor List
                    </Button>
              </Row>
            <Card>
              <Card.Body>
                <Card.Title>
                  Enter Search Criteria
                </Card.Title>
                <Form>
                <Row className="mb-3">
                   <label style={{fontWeight:'bold',color:'blue'}}>Search Options: Vendor Number | Vendor Name | Vendor Number and Date Range | Vendor Name And Date Range  </label>
                  </Row>
                 <div id="searchFields">
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Vendor Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Vendor#"
                        id="VendorNumber"
                        name="VendorNumber"
                        onKeyDown={handleKeyDown}
                        value={VendorNumber}
                       
                        onChange={(e) => onChange(e)}
                      />
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Vendor Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter All of Part of Vendor Name"
                        id="VendorName"
                        name="VendorName"
                        value={VendorName}
                        onKeyDown={handleKeyDown}
                       
                        onChange={(e) => onChange(e)
                        }
                      />
                    </Form.Group>
                  </Row>
  
                 
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label >Start Date</Form.Label>
                       <Form.Control 
                        type="text"
                        placeholder="mm/dd/yyyy"
                        id="StartDate"
                        name="StartDate"
                        value={StartDate}
                        onKeyDown={handleKeyDown}
                      
                        onChange={(e) => onChange(e)
                        }/>                 
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label >End Date</Form.Label>
                      <Form.Control 
                        type="text"
                        placeholder="mm/dd/yyyy"
                        id="EndDate"
                        name="EndDate"
                        value={EndDate}
                        onKeyDown={handleKeyDown}
                        
                        onChange={(e) => onChange(e)
                        }/> 
                    </Form.Group>
                  </Row>

                  </div>

                  <Row>
                    <Button
                      variant="primary"
                      type="button"
                      id="btnSearchButton"
                      style={myStyles.buttonSearch}
                      onClick={(e) => searchRecords(e)}
                    >
                      Search Records
                    </Button>
                  </Row>

              

                  <br></br>
                  <hr></hr>
                       <Row>
                            <Col sm={12}>
                                <h2>Search Results</h2>
                             
                            
                                  <ToolkitProvider
                                          keyField="random"
                                          data={tblSearchResultsDistinct}
                                          columns={columnsProduction}
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
                                                  showTotal:true,
                                                  firstPageText:'First',
                                                  lastPageText:'Last'
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
          </Row>

         <Row>
         <Col sm={12}>
         <ModalForRecordSearch
                      actionLabel = "View"
                      title = "Record Details"
                      showPrimaryModal={show}
                      VendorName = {_VendorName}
                      VendorNumber = {_VendorNumber}
                      ClearDate = {_ClearDate}
                      Amount = {_Amount}
                      _SearchResults = {tblSearchResultsFiltered}
                      close="Close"
                      Submit="Place Holder"
                      handleClickOne={(e) => returnToForm}
                      handleClosePrimary={() => closeModalPrimary}
                      handleChange={() => handleChange}

                    />
         </Col>
         </Row>

          <Row style={{ marginTop: "10px" }}>
            <Col sm={12}>
              <ListGroup horizontal style={{ background: "#67a2b9" }}>
                <ListGroup.Item style={myStyles.listgroupItems}>
                  {" "}
                  <a
                    style={myStyles.hyperlinkStyle}
                    href="http://www.houstonisd.org/achievements"
                  >
                    About HISD
                  </a>
                </ListGroup.Item>
                <ListGroup.Item style={myStyles.listgroupItems}>
                  {" "}
                  <a
                    style={myStyles.hyperlinkStyle}
                    href="http://www.houstonisd.org/_headerEmail"
                  >
                    Contact Us
                  </a>
                </ListGroup.Item>
                <ListGroup.Item style={myStyles.listgroupItems}>
                  {" "}
                  <a
                    style={myStyles.hyperlinkStyle}
                    href="http://www.houstonisd.org/_disclaimer"
                  >
                    Legal
                  </a>
                </ListGroup.Item>
                <ListGroup.Item style={myStyles.listgroupItems}>
                  {" "}
                  <a
                    style={myStyles.hyperlinkStyle}
                    href="http://www.houstonisd.org/_termsConditions"
                  >
                    Privacy Policy & Copyright Information
                  </a>
                </ListGroup.Item>
                <ListGroup.Item style={myStyles.listgroupItems}>
                  {" "}
                  <a
                    style={myStyles.hyperlinkStyle}
                    href="https://publicapps.houstonisd.org/CROSEPDF/CroseHelp.pdf"
                  >
                    Help
                  </a>
                </ListGroup.Item>
              </ListGroup>
            </Col>
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
export default connect(mapStateToProps, { getCroseVendorData})(Crose);
