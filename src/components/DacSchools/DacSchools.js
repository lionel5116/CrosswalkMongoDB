import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { createSchoolRecord, fetchECCSchoolData,fetchECCSchoolDataMYSQL,
       fetchSchoolDataMongoDBAtlas,createSchoolRecordMongoDBAtlas,
       fetchECCSchoolDataV8 } from '../../actions/DacSchools';
import { connect } from 'react-redux'

import { useState } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//SchoolGradeLevelAssociationNaturalKey,SchoolYearNaturalKey,EducationOrgNaturalKey,GradeLvlTypeNaturalKey

export const DacSchools = ({ createSchoolRecord, fetchECCSchoolData,fetchECCSchoolDataMYSQL,fetchSchoolDataMongoDBAtlas,createSchoolRecordMongoDBAtlas,fetchECCSchoolDataV8 }) => {

    const [tblFetchSchoolDataResults, setFetchSchoolDataResults] = useState([])

    const [formData, setFormData] = useState({
        SchoolGradeLevelAssociationNaturalKey: "",
        SchoolYearNaturalKey: "",
        EducationOrgNaturalKey: "",
        GradeLvlTypeNaturalKey: "",
    });

    const {
        SchoolGradeLevelAssociationNaturalKey,
        SchoolYearNaturalKey,
        EducationOrgNaturalKey,
        GradeLvlTypeNaturalKey
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const addNewRecord = async e => {
        e.preventDefault();

        if (formData.SchoolGradeLevelAssociationNaturalKey.length > 0 &&
            formData.SchoolYearNaturalKey.length > 0 &&
            formData.EducationOrgNaturalKey.length > 0 &&
            formData.GradeLvlTypeNaturalKey.length > 0) {

        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }

        await createSchoolRecord(formData);
        clearScreen();
        fetchSchoolData(e);

    }

    const  addSchoolRecordMongoDB = async e => {
        e.preventDefault();

        if (formData.SchoolGradeLevelAssociationNaturalKey.length > 0 &&
            formData.SchoolYearNaturalKey.length > 0 &&
            formData.EducationOrgNaturalKey.length > 0 &&
            formData.GradeLvlTypeNaturalKey.length > 0) {

        }
        else {
            window.alert("Missing required field entries!!!");
            return;
        }

        await createSchoolRecordMongoDBAtlas(formData);
        clearScreen();
        fetchSchoolDataMongoDB(e);
    }

    const clearScreen = () => {
        setFormData({
            SchoolGradeLevelAssociationNaturalKey: "",
            SchoolYearNaturalKey: "",
            EducationOrgNaturalKey: "",
            GradeLvlTypeNaturalKey: "",
        })
    }

    const fetchSchoolData = async (e) => {
        e.preventDefault();
        let _FETCH_DATA = [];

         //clear results first
         setFetchSchoolDataResults([]);

        try {
            _FETCH_DATA = await fetchECCSchoolData();

            if (_FETCH_DATA !== []) {
                setFetchSchoolDataResults(_FETCH_DATA)
            }
            else {
                setFetchSchoolDataResults([]);
            }

        }
        catch (err) {
            console.log(err)
            setFetchSchoolDataResults([]);
        }
    }

    const fetchSchoolDataMYSQL = async (e) => {
        e.preventDefault();
        let _FETCH_DATA = [];

        try {
            _FETCH_DATA = await fetchECCSchoolDataMYSQL();

            if (_FETCH_DATA !== []) {
                setFetchSchoolDataResults(_FETCH_DATA)
            }
            else {
                setFetchSchoolDataResults([]);
            }

        }
        catch (err) {
            console.log(err)
            setFetchSchoolDataResults([]);
        }
    }

     //fetchSchoolDataSQLLocal
     const fetchSchoolDataSQLLocalV8 = async (e) => {
        e.preventDefault();
        let _FETCH_DATA = [];

        try {
            _FETCH_DATA = await fetchECCSchoolDataV8();

            if (_FETCH_DATA !== []) {
                setFetchSchoolDataResults(_FETCH_DATA)
            }
            else {
                setFetchSchoolDataResults([]);
            }

        }
        catch (err) {
            console.log(err)
            setFetchSchoolDataResults([]);
        }
    }


    const fetchSchoolDataMongoDB = async (e) => {
        e.preventDefault();
        let _FETCH_DATA = [];

        //clear results first
        setFetchSchoolDataResults([]);

        try {
            _FETCH_DATA = await fetchSchoolDataMongoDBAtlas();

            if (_FETCH_DATA !== []) {
                setFetchSchoolDataResults(_FETCH_DATA)
            }
            else {
                setFetchSchoolDataResults([]);
            }

        }
        catch (err) {
            console.log(err)
            setFetchSchoolDataResults([]);
        }
    }

    const columns = [
        {
            dataField: 'SchoolGradeLevelAssociationNaturalKey',
            text: 'SchoolGradeLevelAssociationNaturalKey',
            sort: true
        },
        {
            dataField: 'SchoolYearNaturalKey',
            text: 'SchoolYearNaturalKey',
        },
        {
            dataField: 'EducationOrgNaturalKey',
            text: 'EducationOrgNaturalKey',
        },
        {
            dataField: 'GradeLvlTypeNaturalKey',
            text: 'GradeLvlTypeNaturalKey',
        },

    ];


    return (
        <div className="container">
            <br />
            <h1>
                DAC Schools
            </h1>
            <br />
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Grade Lvl Natural Key</Form.Label>
                    <Form.Control
                        type="input"
                        id="SchoolGradeLevelAssociationNaturalKey"
                        name="SchoolGradeLevelAssociationNaturalKey"
                        value={SchoolGradeLevelAssociationNaturalKey} onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>School Year</Form.Label>
                    <Form.Control
                        type="input"
                        id="SchoolYearNaturalKey"
                        name="SchoolYearNaturalKey"
                        value={SchoolYearNaturalKey} onChange={e => onChange(e)}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Campus Number</Form.Label>
                    <Form.Control
                        type="input"
                        id="EducationOrgNaturalKey"
                        name="EducationOrgNaturalKey"
                        value={EducationOrgNaturalKey} onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Grade Level Type</Form.Label>
                    <Form.Control
                        type="input"
                        id="GradeLvlTypeNaturalKey"
                        name="GradeLvlTypeNaturalKey"
                        value={GradeLvlTypeNaturalKey} onChange={e => onChange(e)}
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>

                    <Button variant="success"
                        type="button"
                        onClick={(e) => addNewRecord(e)}
                        id="btnAddNew"

                    >
                        Add New
                    </Button>
                </Form.Group>
            </Row>

            <br />
            <hr />
            <Button
                variant="primary"
                type="button"
                onClick={(e) => fetchSchoolData(e)}
            >
                Fetch School Records
            </Button>
            <Button
                variant="success"
                type="button"
                style={{marginLeft:'5px'}}
                onClick={(e) => fetchSchoolDataSQLLocalV8(e)}
            >
                Fetch SQL Server Local
            </Button>
            <Button
                variant="warning"
                type="button"
                style={{marginLeft:'5px'}}
                onClick={(e) => fetchSchoolDataMYSQL(e)}
            >
                Fetch School Records MYSQL
            </Button>
            <Button
                variant="primary"
                type="button"
                style={{marginLeft:'5px'}}
                onClick={(e) => addSchoolRecordMongoDB(e)}
            >
                Add School Records MongoDB
            </Button>
            <Button
                variant="danger"
                type="button"
                style={{marginLeft:'5px'}}
                onClick={(e) => fetchSchoolDataMongoDB(e)}
            >
                Fetch School Records MongoDB
            </Button>
            <br />
            <Row>
                <Col sm={12}>
                    <h2>Schools</h2>

                    <BootstrapTable
                        striped
                        hover
                        keyField="SchoolGradeLevelAssociationNaturalKey"
                        data={tblFetchSchoolDataResults}
                        columns={columns}
                        
                        pagination={paginationFactory({
                            showTotal: true,
                            firstPageText: "First",
                            lastPageText: "Last",
                        })}
                        

                    />
                </Col>
            </Row>
        </Form>
        </div>
    );
}


const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, { createSchoolRecord, fetchECCSchoolData,fetchECCSchoolDataMYSQL,fetchSchoolDataMongoDBAtlas,createSchoolRecordMongoDBAtlas,fetchECCSchoolDataV8})(DacSchools)