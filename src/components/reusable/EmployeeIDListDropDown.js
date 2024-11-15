import React, {useEffect,useState} from 'react';
import studentInfoApi from '../../api/studentInfoAPI';



function EmployeeIDListDropDown(props) {

  const [AlreadyFetched, setAlreadyFetched] = useState(false);

useEffect(() => {
    if (AlreadyFetched) {
    }
    else 
    {
      fetchEmployeeIDs();
    }
    
  },[AlreadyFetched]);


const  removeAllDDItems = () => {
  var _DDEmployeeIDSelect = document.getElementById(props.name); 
  for (let i = _DDEmployeeIDSelect.options.length - 1; i >= 0; i--) {
    _DDEmployeeIDSelect.remove(i);
  }
}
async function fetchEmployeeIDs() {   
      
      let _EMPOLYEE_ID_DATA = [];
      var myAPI = new studentInfoApi();
      _EMPOLYEE_ID_DATA = await myAPI.fetchEmployeeIDs()
     
      var _DDEmployeeIDSelect = document.getElementById(props.name); 

      //  //clear items first - because
      for (let i = _DDEmployeeIDSelect.options.length - 1; i >= 0; i--) {
        _DDEmployeeIDSelect.remove(i);
      }

      _DDEmployeeIDSelect.options[_DDEmployeeIDSelect.options.length] = new Option('--Select--');
      
      for(const key in _EMPOLYEE_ID_DATA) {     
        _DDEmployeeIDSelect.options[_DDEmployeeIDSelect.options.length] = new Option(_EMPOLYEE_ID_DATA[key].EmployeeID);
      }
      
      setAlreadyFetched(true)
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

export default EmployeeIDListDropDown;