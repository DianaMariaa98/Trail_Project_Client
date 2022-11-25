import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Mountains from './components/Mountains';
import MountainsDetails from './components/MountainsDetails';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/signup' element ={<Signup/>}/>
      <Route path='/mountains' element ={<Mountains/>}/>
      <Route path='/mountains/:id' element ={<MountainsDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
