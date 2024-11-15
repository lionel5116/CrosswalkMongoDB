import React, {useEffect} from 'react';
import {fetchSchoolListings} from '../../actions/crosswalk';
import studentInfoApi from '../../api/studentInfoAPI';



function SchoolListDropDown(props) {

//const [dropDownSchoolListingData, setdropDownSchoolListingData] = useState([])

useEffect(() => {
    fetchSchoolListingDataViaActions();
  },[]);

  
async function fetchSchoolListingDataViaActions() {   
        
      let _SCHOOL_LISTING_DATA = [];
      var myAPI = new studentInfoApi();
      _SCHOOL_LISTING_DATA = await myAPI.fetchSchoolListings()
  
      //console.log(_SCHOOL_LISTING_DATA)
     
      var _DDSchoolListingSelect = document.getElementById(props.name); 

     //  //clear items first - because
     for (let i = _DDSchoolListingSelect.options.length - 1; i >= 0; i--) {
      _DDSchoolListingSelect.remove(i);
    }

      //setdropDownSchoolListingData(_dropDownValues)
      _DDSchoolListingSelect.options[_DDSchoolListingSelect.options.length] = new Option('--Select--');
      for(const key in _SCHOOL_LISTING_DATA) {     
         _DDSchoolListingSelect.options[_DDSchoolListingSelect.options.length] = new Option(_SCHOOL_LISTING_DATA[key].NameOfInstitution);
      }
   
  }

  return (
    <div>
      <select className="form-select form-select-sm" 
              aria-label=".form-select-sm example" 
              style={{ width: 300 }} 
              name={props.name}
              id={props.name}
              onChange={props.handleChange}>
        
      </select>
    </div>
  )
}

//

export default SchoolListDropDown;