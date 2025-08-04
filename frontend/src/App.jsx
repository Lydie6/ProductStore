import { IoAddOutline } from "react-icons/io5";
import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react"; 

function App() {
  const [darkMode, setDarkMode] = useState(false);
 
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  useEffect(()=>{
    if(darkMode){
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    }
    else{
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  },[darkMode])

  return (
    <>
    <div className={`min-h-screen   ${darkMode ? ' ' : ' text-gray-900'}`}>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  <main className="container mx-auto p-6">
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
