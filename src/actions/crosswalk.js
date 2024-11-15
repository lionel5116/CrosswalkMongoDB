import { setAlert } from "./alert";
import Config from '../api/config';
import axios from 'axios';

import moment  from "moment";


export const fetchSchoolListings = () =>
    async (dispatch) => { 

        var serviceUrl = Config.REST_URL + '/api/school/fetchSchoolListings/';
        console.log(serviceUrl)

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.get(serviceUrl,config);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not find records",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not get CROSE data",
                        "danger"
                    )
                );;
            }      
};

export const fetchCrosswalkEntryData = () =>
    async (dispatch) => { 

        
        var serviceUrl = "";
        serviceUrl = Config.REST_URL + 'api/crosswalk/fetchCrosswalkRecords/'

        const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.get(serviceUrl,config);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not find records",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not get CROSE data",
                        "danger"
                    )
                );;
            }      
};

export const AddOrUpdateCrosswalkRecord = (formData) =>
    async (dispatch) => { 

        
        var serviceUrl = "";
        serviceUrl = Config.REST_URL + '/api/crosswalk/AddOrUpdateCrosswalkRecord/'

        const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.post(serviceUrl,formData);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not update/add data",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not update/add data",
                        "danger"
                    )
                );;
            }      
};

export const fetchCrosswalkEntriesFilteredBySchool = (_schoolName) =>
    async (dispatch) => { 

        //console.log(_schoolName)
        _schoolName = _schoolName.replace("&", "");

        var serviceUrl = "";
        serviceUrl = Config.REST_URL + 'api/Crosswalk/fetchCrosswalkEntriesFilteredBySchool/'
        serviceUrl += _schoolName;

        const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.get(serviceUrl,config);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not find records",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not find records",
                        "danger"
                    )
                );;
            }      
};

export const DeleteCrosswalkRecord = (formData) =>
    async (dispatch) => { 

        
        var serviceUrl = "";
        serviceUrl = Config.REST_URL + 'api/Crosswalk/DeleteCrosswalkRecord/'

            try {
                const res = await axios.post(serviceUrl,formData);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not find records",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not find records",
                        "danger"
                    )
                );;
            }      
};
export const checkForDuplicateCrosswalkRecord = (formData) =>
    async (dispatch) => { 

        
        var serviceUrl = "";
        serviceUrl = Config.REST_URL + 'api/Crosswalk/fetchCrosswalkEntriesAllParameters/'

            try {
                const res = await axios.post(serviceUrl,formData);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not find records",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not find records",
                        "danger"
                    )
                );;
            }      
};

export const fetchEmployeeData = (_EmployeeID) =>
    async (dispatch) => { 


        var serviceUrl = "";
        serviceUrl = Config.REST_URL + 'api/Crosswalk/fetchEmployeeData/'
        serviceUrl += _EmployeeID;

        const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.get(serviceUrl,config);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not find records",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not find records",
                        "danger"
                    )
                );;
            }      
};

//WE ARE USING THIS ACTION FOR BOTH FETCHING EMPLOYEE IDS FOR DROPDOWN AS WELL AS FETCHING ALL ASSOCIATED EMPLOYEE DATA FOR A SCHOOL
export const fetchEmployeeIDSBySchoolName = (_SchoolName) =>
    async (dispatch) => { 

        _SchoolName = _SchoolName.replace("&", "");
        var serviceUrl = "";
        serviceUrl = Config.REST_URL + 'api/Crosswalk/fetchEmployeeDataBySchoolName/'
        serviceUrl += _SchoolName;

        const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.get(serviceUrl,config);
                //console.log(res.status)
                if (res.status === 200) {
            
                    return res.data
                 }
                 else if (res.status === 400) {
                    
                     dispatch(
                         setAlert(
                             "No EmployeeIDs found for selected school.. based on bad request 400",
                             "warning"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "No EmployeeIDs found for selected school",
                        "warning"
                    )
                );;
            }      
};

export const UpdateCrosswalkRecord = (formData) =>
    async (dispatch) => { 

        
        var serviceUrl = "";
        serviceUrl = Config.REST_URL + 'api/Crosswalk/UpdateCrosswalkRecord/'

        const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.post(serviceUrl,formData);
                if (res.status === 200) {
            
                    return res.data
                 }
                 else {
                    
                     dispatch(
                         setAlert(
                             "Could not update data",
                             "danger"
                         )
                     );
                     return []
                 }
                
            } catch (error) {
                console.log(error.message)
                dispatch(
                    setAlert(
                        "Could not update data",
                        "danger"
                    )
                );;
            }      
};



