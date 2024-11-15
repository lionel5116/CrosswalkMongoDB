import React from 'react'
import DashboardImage from '../../images/SampleDashboard.jpg';
import { Container,Card,Col,Row ,Form} from 'react-bootstrap';

const Dashboard = () => {
  return (
    <div className="MainPage">
      <Container>
      <Card style={{ boxShadow: "-5px 5px  #78Acc0", marginTop: "100px" }}>
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
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue={"-select-"}></option>
                    <option value="School One">School One</option>
                    <option value="2">School Two</option>
                    <option value="3">School Three</option>
                  </select>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <Row style={{marginTop:'50px'}}>
          <Col sm={12}>
          <div style={{
              width:"100%",
              height:"900px",
              backgroundImage:`url(${DashboardImage})`,
              backgroundSize:"cover",
              backgroundRepeat:"no-repeat"
          }}></div>
          </Col>
        </Row>
    
      </Container>
        
        
        </div>
  )
}

export default Dashboard