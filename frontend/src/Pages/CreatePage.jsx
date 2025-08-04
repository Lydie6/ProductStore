// src/pages/CreatePage.jsx
import React, { useRef,useState } from 'react';
import { useProductStore } from '../store/Product.js';
import Notify from '../Components/Notify.jsx';
import ProductForm from '../Components/ProductForm.jsx';

const CreatePage = ({ darkMode }) => {
  const [notification, setNotification] = useState(null);
 const formRef=useRef();
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // 3 seconds is enough, not 90 seconds
  };

  const { createProduct } = useProductStore();

  
  const handleAddProduct = async (productData) => {
    try {
      const result = await createProduct(productData);
      if (result.success) {
        showNotification(result.message, 'success');
        formRef.current?.reset();
      } else {
        showNotification(result.message, 'error');
      }
    } catch (error) {
      showNotification('An error occurred', 'error');
    }
  };

  return (
    <section className="min-h-screen">
      <p
        className={`text-4xl md:text-5xl lg:text-6xl font-bold text-center mt-8 ${darkMode ? 'text-white ' : 'text-[#1a1f2e] '}`}
      >
        Create New Product
      </p>

      <div
        className={` max-w-lg mx-auto mt-10 p-8 rounded-lg shadow-xl ${darkMode ? '' : ' border border-[#E0E0E0]  '}`}
      >
          {/* ✅ Pass onSubmit to ProductForm */}
          <ProductForm
          ref={formRef}
            onSubmit={handleAddProduct}
            submitLabel="Add Product"
            darkMode={darkMode}
          />
      </div>

      {/* Notification */}
      {notification && (
        <Notify
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </section>
  );
};

export default CreatePage;