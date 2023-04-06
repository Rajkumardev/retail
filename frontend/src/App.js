import logo from './logo.svg';
import './App.css';
import { Route, Routes, useParams } from "react-router-dom";
import Dashboard from "./templates/Dashboard";
import StoreList from './components/StoreList';
import StoreEdit from './components/StoreEdit';

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<StoreList />} />
          <Route path="/store/edit/:StoreId" element={<StoreEdit />} />
        </Routes>

    </div>
  );
}

export default App;
