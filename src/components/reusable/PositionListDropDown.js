import React, {useEffect} from 'react';
import studentInfoApi from '../../api/studentInfoAPI';



function PositionListDropDown(props) {

useEffect(() => {
    fetchPositions();
  },[]);

  
async function fetchPositions() {   
        
      let _POSITION_DATA = [];
      var myAPI = new studentInfoApi();
      _POSITION_DATA = await myAPI.fetchPositions()
     
      var _DDPositionSelect = document.getElementById(props.name); 

         //  //clear items first - because
         for (let i = _DDPositionSelect.options.length - 1; i >= 0; i--) {
          _DDPositionSelect.remove(i);
        }
  
      _DDPositionSelect.options[_DDPositionSelect.options.length] = new Option('--Select--');
      for(const key in _POSITION_DATA) {     
        _DDPositionSelect.options[_DDPositionSelect.options.length] = new Option(_POSITION_DATA[key].Position);
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

export default PositionListDropDown;