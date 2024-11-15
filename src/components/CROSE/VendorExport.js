import {React,useState} from 'react'
//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
import { getCroseVendorList } from "../../actions/crose";
import { connect } from "react-redux";

import { useEffect } from 'react';

import {
    Col,
    Row} from 'react-bootstrap';

function VendorExport({getCroseVendorList}) {

    const [tblSearchResults, setSearchResults] = useState([])

    useEffect(() => {
        searchRecords();
    },[]);
    

    const searchRecords = async (e) => {
    
        let _SEARCH_DATA = [];

        try {
            _SEARCH_DATA = await getCroseVendorList();
      
           if(_SEARCH_DATA !== null)
           {
            setSearchResults(_SEARCH_DATA)
           }
           else {
            setSearchResults([]);
           }

         
        }
        catch (err) {
            console.log(err)
            setSearchResults([]);
        }
    }


    const MyExportCSV = (props) => {
        const handleClick = (e) => {
          e.preventDefault();
          props.onExport();
        };
        return (
          <div>
            <button className="btn btn-success" onClick={(e) =>handleClick(e) }>Export to CSV</button>
          </div>
        );
      };


      const columnsProduction = [
        {
          dataField: 'random',
          text: 'random',
          sort: true,
          hidden:true
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
          <Row>
          <Col sm={12}>
                              
                                  <ToolkitProvider
                                          keyField="random"
                                          data={tblSearchResults}
                                          columns={columnsProduction}
                                          exportCSV={{
                                            onlyExportFiltered: true,
                                            exportAll: false,
                                          }}
                                        >
                                          {(props) => (
                                            <div>
                                            
                                              <MyExportCSV {...props.csvProps} />
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
    </div>
  )
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getCroseVendorList})(VendorExport);