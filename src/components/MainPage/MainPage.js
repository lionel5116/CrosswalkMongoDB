import React from 'react';
import Nav from 'react-bootstrap/Nav';
//import '../../MainCSS.css';
import EducationHeroImage from '../../images/IMPLEMENTING-OPEN-EDUCATIONAL-RESOURCES.jpg';





const MainPage = () => {
    
    return (
       
        <div className="MainPage">
         <div style={{
            width:"100%",
            height:"850px",
            backgroundImage:`url(${EducationHeroImage})`,
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat"
         }}></div>
        
        </div>
     
    )
  
  }
  
  
  const myStyles = {
    navBarMarginLeft: {
      marginLeft: '15px'
    },

   
  };
  
  
  export default MainPage