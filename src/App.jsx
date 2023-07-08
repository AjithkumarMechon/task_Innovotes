import './App.css';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planet from './pages/planet';

function App() {
  return (
    <div className="container">
      <h1>Star Wars</h1>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/planets" element={<Planet />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
