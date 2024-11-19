import NavbarMain from "./NavBarMain/NavbarMain";
import { Route, Routes, HashRouter } from 'react-router-dom'
import JavaScriptTesting from "./components/JavaScriptTesting";
import Alert from './components/reusable/Alert'
import Login from './components/Login/Login'
import DacSchools from "./components/DacSchools/DacSchools";
import Crose from "./components/CROSE/Crose";
import VendorExport from "./components/CROSE/VendorExport";

import CrossWalk from "./components/CROSSWALK/CrossWalk";
import CrossWalkNewDesign from "./components/CROSSWALK/CrossWalkNewDesign";
import CrossWalkNewDesignWorking from "./components/CROSSWALK/CrossWalkNewDesignWorking";
import Dashboard from "./components/CROSSWALK/Dashboard";
//import MainPage from "./components/MainPage/MainPage";

//shopping cart
import Store from "./components/ShoppingCart/Store";
import Success from "./components/ShoppingCart/Success";
import Cancel from "./components/ShoppingCart/Cancel";

import CartProvider from "./components/ShoppingCart/CartContext";

function App() {
  return (
    <CartProvider>
      <div id="MasterContainer">
        <HashRouter>
          <NavbarMain />
          <section className='container'>
            <Alert />
          </section>
          <Routes>
          <Route path="/" element={<Dashboard />}></Route>
            <Route path="/CrossWalk" element={<CrossWalk />}></Route>
            
            
            <Route path="/CrossWalkNewDesign" element={<CrossWalkNewDesign />}></Route>
            <Route path="/CrossWalkNewDesignWorking" element={<CrossWalkNewDesignWorking />}></Route>
            <Route path="/Dashboard" element={<Dashboard />}></Route>
            
            <Route path="/Crose" element={<Crose />}></Route>
            <Route path="/VendorExport" element={<VendorExport />}></Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/JavaScriptTesting" element={<JavaScriptTesting />}></Route>
            <Route path="/DacSchools" element={<DacSchools />}></Route>

           

            <Route path="/Store" element={<Store />}></Route>
            <Route path="/Success" element={<Success />}></Route>
            <Route path="/Cancel" element={<Cancel />}></Route>
          </Routes>
        </HashRouter>
      </div>
    </CartProvider>
  );
}

export default App;
