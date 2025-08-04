import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../App.css"
import { CiLight } from "react-icons/ci";


const Navbar = ({ darkMode, toggleDarkMode, onAddProduct }) => {
  const navigate=useNavigate();
  const handleAddClick=()=>{
    navigate("/create");
  }
  return (
    <nav className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      {/* Par/tie gauche ulogo  panier */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gradient ">PRODUCT STORE</h1>
        <FaShoppingCart size={25} className='text-cyan-500' />
      </div>

      {/* Partie droite avec boutons */}
      <div className="flex items-center space-x-4">
        {/* Bouton d'ajout */}
        <button onClick={onAddProduct} className="p-2">
          <MdOutlineAddBox onClick={handleAddClick} className={`w-5 h-5 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`} />
        </button>

        
        <button onClick={toggleDarkMode} className="p-2">
          {darkMode ? (
            <HiOutlineSun className="w-5 h-5 text-yellow-300" />
          ) : (
            <HiOutlineMoon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;