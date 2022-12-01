import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Mountains from './pages/Mountains';
import MountainsDetails from './pages/MountainsDetails';
import AddMountain from './components/AddMountain';
import axios from 'axios';
import { useState, useEffect} from 'react';
import Anon from './components/Anon';
import Private from './components/Private';
import Profile from './pages/Profile';
import EditMountain from './pages/EditMountain';
import AsiaMountains from './pages/AsiaMountains';
import EuropeanMountains from './pages/EuropeanMountains';



function App() {

  const[showMountain, setShowMountain] = useState(null);
  const[showAsianMountains, setShowAsianMountains] = useState(null);
  const[showEuropeanMountains, setShowEuropeanMountains] = useState(null);

      const filterMountains = async (searchQuery) => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/mountains`);
      console.log(response.data)

      let filteredMountain = response.data.filter((mountain) => 
      mountain.mountain_name.toLowerCase().includes(searchQuery.toLowerCase()))
      setShowMountain(filteredMountain);

      let filteredAsianMountains = response.data.filter((mountain) => 
      mountain.mountain_name.toLowerCase().includes(searchQuery.toLowerCase()) && mountain.continent === 'Asia')
      setShowAsianMountains(filteredAsianMountains);

      let filteredEuropeanMountains = response.data.filter((mountain) => 
      mountain.mountain_name.toLowerCase().includes(searchQuery.toLowerCase()) && mountain.continent === 'Europe')
      setShowEuropeanMountains(filteredEuropeanMountains);
    }

  return (
    <div className="App">
      <Navbar filterMountains={filterMountains}/>
      <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/signup' element ={<Signup/>}/>
      <Route path='/mountains' element ={<Mountains showMountain = {showMountain}/>}/>
      <Route path='/mountains/:id' element ={<MountainsDetails/>}/>
      <Route path='/trails' element ={<AddMountain/>}/>
      <Route path ="/signup" element ={
        <Anon>
          <Signup/>
        </Anon>
      }
      />
      <Route path="/login" element={<Login/>} />
      <Route path='/profile' element={<Private><Profile/></Private>}/>
      <Route path='/editTrail/:id' element={<EditMountain/>}/>

      <Route path="/asiaMountains" element={<AsiaMountains showAsianMountains = {showAsianMountains}/>} />

      <Route path="/europeMountains" element={<EuropeanMountains showEuropeanMountains = {showEuropeanMountains}/>} />
      
      
     </Routes>
    </div>
  );
  
}

export default App;
