import React, { useState } from 'react';
import { IoRocket } from "react-icons/io5";
import { useProductStore } from '../store/Product.js';
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import Notify from '../Components/Notify.jsx';
import ProductForm from '../Components/ProductForm.jsx'
import Modal from '../Components/Modal.jsx'
import { Link } from 'react-router-dom'
const HomePage = ({ darkMode }) => {
  const [notification, setNotification] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const { fetchProducts, products, deleteProduct, updateProduct } = useProductStore();
  const [isModalOpen, setIsModalOpen]=useState(false);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    // 🚧 Temporary fix: use message as fallback
    const isSuccess = success || message.includes("successfully");

    if (isSuccess) {
      setNotification({ type: "success", message });
      fetchProducts();
    } else {
      setNotification({ type: "error", message });
    }

    setTimeout(() => {
      setNotification(null);
    }, 9000);
  };
  const handeUpdateProduct = async (updatedProduct) => {
    if (!updatedProduct._id) {
      setNotification({ type: "error", message: "Product ID is missing!" });
      return;
    }
    const result = await updateProduct(updatedProduct._id,updatedProduct);
    if (result.success) {
      setNotification({ type: "success", message: result.message });
      setIsModalOpen(false);
      setEditingProduct(null);
    }
    else {
      setNotification({ type: "error", message: result.message });
    }
    setTimeout(() =>
      setNotification(null)
      , 3000);
  }

  return (
    <section className="">
      <div className="w-fit mx-auto p-[2rem] flex flex-col gap-4 justify-center items-center">
        <div className='flex items-center gap-2' >
          <h1 className="text-gradient text-2xl font-bold">Current Products </h1>
          <IoRocket className='' color='#3D80BA' size={30} />
        </div>
        {products.length === 0 && (
          <div className="flex ">
            <p className="text-gray-400">No products found 😪 </p>
            <p className=" font-bold text-blue-900 ">   <Link
            to="/create"
            className="hover:underline hover:cursor-pointer"
          >
            Create a Product
          </Link></p>
          </div>
        )

        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-fit mx-auto">
        {products.map((product, index) => (
          <div key={product._id} className={`  rounded-[6px] font-semibold ${darkMode ? "text-white  " : "bg-[#d9eafa]"} `}>

         
                <div className='w-full h-48 overflow-hidden'>
                  <img className="object-cover" src={product.image} alt={product.name} />
                  </div>
                <div className="flex flex-col gap-2 justify-start items-start p-3">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p>{product.price}€</p>
                  <div className="flex gap-1">
                    <button className="bg-[#6FD1FE] p-2 rounded-[4px]" onClick={() => {setEditingProduct(product);setIsModalOpen(true);}}>
                      <FaRegEdit size={18} color="#1B1B1C" />
                    </button>
                    <button className="bg-[#E4A1A6] p-2 rounded-[4px]" onClick={() => handleDeleteProduct(product._id)}>
                      <MdDelete size={18} color="#1B1B1C" />
                    </button>
                  </div>
                </div>
  
          </div>
        ))}



      </div>
      {notification && < Notify message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      {
        isModalOpen &&(
          <Modal isOpen={isModalOpen}  darkMode={darkMode} onClose={()=>setIsModalOpen(false)}>
              <p className={`mb-6 text-1xl md:text-2xl lg:text-3xl font-bold text-center  ${darkMode ? 'text-white ' : 'text-[#1a1f2e] '}`}>
               Updted product
                </p>
              <ProductForm
                  darkMode={darkMode}
                  initialData={editingProduct}
                  onSubmit={handeUpdateProduct}
                  submitLabel="update"
                  onCancel={() => {setEditingProduct(null);setIsModalOpen(false);}}
                />
          </Modal>
        )
      }
    </section>
  )
}

export default HomePage
