import { IoAddOutline } from "react-icons/io5";
import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import Navbar from "./Components/Navbar";
import { useState } from "react"; 
function App() {
  const [darkMode,setDarkMode] = useState(false);
  function toggleDarkMode(){
      setDarkMode(!darkMode);
  }

  return (
    <>
    <div className={`min-h-screen  ${darkMode?'bg-black text-white': 'bg-white text-black'} `}>
    <Navbar  darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
  <main className="container mx-auto p-4">
      <Routes>
      <Route path="/" element={<HomePage darkMode={darkMode}/>}/>
      <Route path="/create" element={<CreatePage darkMode={darkMode}/>}/>
    </Routes>
  </main>
    </div>
    </>
 
  )
}

export default App
