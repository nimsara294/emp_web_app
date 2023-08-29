import './App.css';
import Tabs from './Components/Tabs';
import DepCrud from './pages/DepCrud';
import EmpCrud from './pages/EmpCrud';

function App() {
  return (
    <div className="App">
      <Tabs />
      <EmpCrud />
      <DepCrud />
    </div>
  );
}

export default App;
