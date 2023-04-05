import logo from './logo.svg';
import './App.css';
import { Route, Routes, useParams } from "react-router-dom";
import Dashboard from "./templates/Dashboard";

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Dashboard edit={false}/>} />
          <Route path="/store/edit/:StoreId" element={<Dashboard edit={true}/>} />
        </Routes>
    </div>
  );
}

export default App;
