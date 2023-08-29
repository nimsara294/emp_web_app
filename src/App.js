import './App.css';
import { Route, Routes } from "react-router-dom";
import Tabs from './Components/Tabs';
import DepCrud from './pages/DepCrud';
import EmpCrud from './pages/EmpCrud';

function App() {
  return (
    <div className="App">
      <Tabs />
      <br></br>
      <Routes>
        <Route path="/" element={<EmpCrud/>} />
        <Route path="/employees" element={<EmpCrud/>} />
        <Route path="/departments" element={<DepCrud/>} />
      </Routes>
    </div>
  );
}

export default App;
