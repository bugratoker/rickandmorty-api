import './App.css';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Docs from './views/pages/Docs';
import SupportUs from './views/pages/SupportUs';
import Home from './views/home';
import About from './views/pages/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/docs" element={<Docs />} />
            <Route path="/supportus" element={<SupportUs />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
