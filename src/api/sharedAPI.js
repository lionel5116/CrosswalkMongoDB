import Config from './config';
import axios from 'axios';


export const fetchCandidateNominees = async () => {
    var url = Config.REST_URL + 'dac/odata/CandidateNominees?$filter=VotingSettingID eq 14 and LocationID eq 1'
    console.log(url)
    try
    {
        return await axios.get(url)
        .then(res => {
            return res.data.value;
        });
    } catch (err)
    {
      console.log("Issue Fetching Records " + err)
      return []
    }
}

export const fethECCSchoolData = async () => {
    var url = Config.LOCAL_HOST_API + 'api/dac/getECCSchools'
    console.log(url)
    try
    {
        return await axios.get(url)
        .then(res => {
            return res.data;
        });
    } catch (err)
    {
      console.log("Issue Fetching Records " + err)
      return []
    }
}

export const fethCartProductData = async () => {
    var url = Config.LOCAL_HOST_API + 'api/products/fetchAllProducts'
    console.log(url)
    try
    {
        return await axios.get(url)
        .then(res => {
            //console.log(res.data);
            return res.data;
        });
    } catch (err)
    {
      console.log("Issue Fetching Records " + err)
      return []
    }
}
