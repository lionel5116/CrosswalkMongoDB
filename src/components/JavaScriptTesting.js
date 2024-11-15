import React from 'react'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { fetchCandidateNominees } from '../api/sharedAPI';
import { fethECCSchoolData } from '../api/sharedAPI';



function JavaScriptTesting() {

   const compareArrayAndFilter = () => {
      let candiateNominees = [
        {
            "EmployeeID":'P00215478',
            "EmpName":'Lionel Jones',
            "DepartmentName":'Austin High School',
            "CandidateNomineeID":30
        },
        {
            "EmployeeID":'P00RJAM',
            "EmpName":'Rick James',
            "DepartmentName":'Farias ECC',
            "CandidateNomineeID":41
        },
        {
            "EmployeeID":'P002LAN',
            "EmpName":'David Lanier',
            "DepartmentName":'Neff ECC',
            "CandidateNomineeID":90
        },
        {
            "EmployeeID":'P001452',
            "EmpName":'Feliia Carol',
            "DepartmentName":'School at St George Place',
            "CandidateNomineeID":75
        },
        {
            "EmployeeID":'P009854',
            "EmpName":'Sharron Stephens',
            "DepartmentName":'Harper DAEP',
            "CandidateNomineeID":14
        },
        {
            "EmployeeID":'P00LOU',
            "EmpName":'Katherine Balloo',
            "DepartmentName":'King Early Childhood CTR',
            "CandidateNomineeID":7
        },
      ]

      //console.log(candiateNominees)
      let specificSchool = candiateNominees.filter(e => {
          return (e.DepartmentName === 'King Early Childhood CTR')
      })
      console.log(specificSchool)

      let eccSchools = candiateNominees.filter(e => {
        return (e.DepartmentName.includes('ECC'))
    })
    console.log(eccSchools)
   }

    const fetchCandidateNomineesRecords = async (e) => {
        try {
            let _SEARCH_DATA = [];
            _SEARCH_DATA = await fetchCandidateNominees();
            if (_SEARCH_DATA !== null) {
                let candidateNomineeResults = _SEARCH_DATA.filter(e=> {
                    return (e.CreatedBy.includes('SHARRISM'))
                })
                console.log(candidateNomineeResults)
            }
            else {
                console.log("Nothing returned")
            }
        }
        catch (err) {
            console.log(err)

        }
    }

    const fetchECCSchoolRecords = async (e) => {
        try {
            let _FETCH_DATA = [];
            _FETCH_DATA = await fethECCSchoolData();

            if (_FETCH_DATA !== null) {
                let filteredSchools = _FETCH_DATA.filter(e=> {
                    return (e.SchoolGradeLevelAssociationNaturalKey ==='2023_350_PK')
                })
                console.log(filteredSchools)
            }
            else {
                console.log("Nothing returned")
            }

        }
        catch (err) {
            console.log(err)

        }
    }

    return (
        <div className="container">
            <br />
            <h1>
                Javascript Testing Harness
            </h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Button variant="primary"
                         onClick={(e)=>fetchCandidateNomineesRecords(e)}>
                            Fetch Candidate Nominees
                        </Button>
                        <Button variant="primary" style={myStyles.buttonPadLeft}
                         onClick={(e)=>fetchECCSchoolRecords(e)
                            }
                        >
                            ECC School Data
                        </Button>
                        <Button variant="warning" style={myStyles.buttonPadLeft}
                         onClick={(e)=>compareArrayAndFilter(e)}
                        >
                            Filter Array
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}

const myStyles = {
    buttonPadLeft: {
        marginLeft: '2px'
    },
    smallerTextFields: {
        width: '300px',
    },
    buttonCustomStyle: {
      width:'100%'
    }
  
  };

export default JavaScriptTesting