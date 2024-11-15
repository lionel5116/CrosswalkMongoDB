import {React} from 'react'
import {Button,
    Col,
    Row,
    Modal} from 'react-bootstrap';
    
//react bootstrap table next
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory  from 'react-bootstrap-table2-filter';


import moment from "moment";

function ModalForRecordSearch(props) {

  //const [tblSearchResults, setSearchResults] = useState([])


  function CellFormatterDate(cell, row) {
    if (!cell) {
          return "";
    }
      return `${moment(cell).format("MM/DD/YYYY")? moment(cell).format("MM/DD/YYYY"):moment(cell).format("MM/DD/YYYY") }`;
}

function CellFormatterCheckAmount(cell, row) {

  return <div style={{ textAlign: "right" }}>{'$' + numberWithCommas(parseFloat(cell).toFixed(2))}</div>
  //parseFloat(cell).toFixed(2);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

  const columnsProduction = [

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
    {
      dataField: 'CheckDate',
      text: 'Payment Date',
      formatter: CellFormatterDate,
      sort: true
   },
    {
      dataField: 'Amount',
      text: 'Amount',
      formatter: CellFormatterCheckAmount,
   },
  
];

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

const rowStyle = {  height: '10px', padding: '2px 0' };

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
          <Row>
            <Col
              sm={1.75}
              style={{ paddingRight: 10, marginLeft: 12, width: 150 }}
            >
              Vendor Name
            </Col>
            <Col sm={2}>
              <label type="text" id="VendorName"  style={{ width: 300 }} >{props.VendorName}</label>
              
            </Col>
          </Row>
       
          <br></br>
          <Row>
          <Col sm={12}>
                              
                                  <ToolkitProvider
                                          keyField="id"
                                          data={props._SearchResults}
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

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClosePrimary()}>
            {props.close}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  
}


/*
const styles = {
  modalInputSyle: {
    width:600
  }
};
*/


export default ModalForRecordSearch