
import Config from './config';
import axios from 'axios';

export class studentInfoApi {

async  fetchSchoolListings(){
        var url = Config.REST_URL + '/api/school/fetchSchoolListings/'
        return await axios.get(url)
        .then(res => {
            return res.data;
        });

    }

    async  fetchPositions(){
        var url = Config.REST_URL + '/api/position/fetchPositions/'
        return await axios.get(url)
        .then(res => {
            return res.data;
        });
    
    }

    async  fetchAllPositions(){
        var url = Config.REST_URL + '/api/position/fetchPositions/'
        return await axios.get(url)
        .then(res => {
            return res.data;
        });
    }
    async  AssignedPositions(){
        var url = Config.REST_URL + '/api/position/fetchPositions/'
        return await axios.get(url)
        .then(res => {
            return res.data;
        });
    }

    async  fetchEmployeeIDs(){
        var url = Config.REST_URL + '/api/Crosswalk/fetchEmployeeIDs/'
        return await axios.get(url)
        .then(res => {
            return res.data;
        });
    
    }


    
    async  fetchCrosswalkEntries(){
        var url = Config.REST_URL + '/api/crosswalk/fetchCrosswalkRecords/'
        return await axios.get(url)
        .then(res => {
            return res.data;
        });
    
    }

    async  UpdateCrosswalkRecord(formData){
        var url = Config.REST_URL + '/api/crosswalk/UpdateCrosswalkRecord/'
        return await axios.post(url,formData)
        .then(res => {
            return res.data;
        });
    
    }

    async  AddOrUpdateCrosswalkRecord(formData){
        var url = Config.REST_URL + '/api/crosswalk/AddOrUpdateCrosswalkRecord/'
        return await axios.post(url,formData)
        .then(res => {
            return res.data;
        });
    
    }

 
}








export default studentInfoApi