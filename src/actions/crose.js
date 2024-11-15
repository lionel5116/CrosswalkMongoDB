import { setAlert } from "./alert";
import Config from '../api/config';
import axios from 'axios';

import moment  from "moment";



export const getCroseVendorData = (formData) =>
    async (dispatch) => { 

        var _SEARCH_STRING = '';

        _SEARCH_STRING += formData.VendorNumber;
        _SEARCH_STRING += "|";
        _SEARCH_STRING += formData.VendorName;
        _SEARCH_STRING += "|";
        _SEARCH_STRING += moment(formData.StartDate).format("MM-DD-YYYY");
        _SEARCH_STRING += "|";
        _SEARCH_STRING += moment(formData.EndDate).format("MM-DD-YYYY");
        _SEARCH_STRING += "|";
        _SEARCH_STRING += formData.SearchType;

        var serviceUrl = "";
        if(Config.USE_DB === "YES")
        {
            console.log("USING SQL BASED DATA....")
            serviceUrl = Config.REST_URL + 'api/crose/getCroseVendorData/'
        }
        else if (Config.USE_DB === "NO")
        {
            serviceUrl = Config.REST_URL + 'api/crose/getCroseVendorDataFILE_BASED/'
            console.log("USING FILE BASED DATA....")
        }

        serviceUrl += _SEARCH_STRING;
        
        console.log(serviceUrl);

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

export const getCroseVendorList = () =>
    async (dispatch) => { 

        //var serviceUrl = Config.REST_URL + 'api/crose/getCroseVendorList/'
        var serviceUrl = "";

        if(Config.USE_DB === "YES")
        {
                console.log("USING SQL BASED DATA....")
                serviceUrl = Config.REST_URL + 'api/crose/getCroseVendorList/'
        }
        else if (Config.USE_DB === "NO")
        {
                serviceUrl = Config.REST_URL + 'api/crose/getCroseVendorList_PROD_FILE_BASED/'
                console.log("USING FILE BASED DATA....")
        }


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



export const getCroseVendorDataMSSQLV8Local = () =>
    async (dispatch) => { 
        var serviceUrl = Config.LOCAL_HOST_API + 'api/crose/getCroseVendorDataMSSQLV8Local'
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                const res = await axios.get(serviceUrl, config);
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
                        "Could not get school data",
                        "danger"
                    )
                );;
            }      
};

