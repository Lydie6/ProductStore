import React, { useState,useImperativeHandle, forwardRef } from 'react'

const ProductForm = forwardRef(({initialData=null, onSubmit, submitLabel = "Add Product",onCancel,darkMode = false},ref) => {
    const [product, setProduct] = useState({
      _id: initialData?._id || "", 
        name: initialData?.name || "",
        price: initialData?.price || "",
        image: initialData?.image || "",
      });
      const handleChange = (e) => {
          const { name, value } = e.target;
          setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
          }));
      }
      const handleSubmit = (e) => {
          e.preventDefault();
          const productToSubmit = {
            ...product,
            price: parseFloat(product.price) 
    
          };
          onSubmit(productToSubmit);
      };
     useImperativeHandle(ref, () => ({
        reset: () => {
          setProduct({ name: "", price: "", image: "" });
        }
      }));
   
  return (
   <form className="" onSubmit={handleSubmit} >
    <input className=""
    type='text'
    name='name'
    placeholder='Name product' 
    value={product.name}
    onChange={handleChange}
     className={`${darkMode ? 'bg-[#191F2B] border-2 border-gray-500 text-white px-2 mb-4 py-2 w-full bg-transparent focus:border-gray-300 outline-none' : ' border-2 border-gray-300  px-2 mb-4 py-2 w-full text-gray-700 outline-none '} `} 
      required />
          <input
        type="number"
        name="price"
        placeholder="Price"
        step="0.01"
        value={product.price}
        onChange={handleChange}
        className={`${darkMode ? 'border-2 border-gray-500  px-2 mb-4 py-2 w-full bg-transparent text-white focus:border-gray-300 outline-none' : 'border-2 border-gray-300  px-2 mb-4 py-2 w-full text-gray-700 outline-none'}`} 
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={product.image}
        onChange={handleChange}
        className={`${darkMode ? 'border-2 border-gray-500  text-white px-2 mb-4 py-2 w-full bg-transparent focus:border-gray-300 outline-none' : 'border-2 border-gray-300  px-2 mb-4 py-2 w-full text-gray-700 outline-none'}`}
        required
      />
   <div className="flex gap-3 pt-2">
{
  onCancel &&(
    <button
    type='button'
    onClick={onCancel}
     className={`${darkMode ? 'border-2 border-gray-500  py-2 w-full bg-blue-300' : 'border-2 border-gray-300  py-2 w-full bg-blue-300'}`} 
    >
      cancel
    </button>
  )
}
   <button
        type="submit"
        className={`${darkMode ? 'border-2 border-gray-500  py-2 w-full bg-blue-300' : 'border-2 border-gray-300  py-2 w-full bg-blue-300'}`} 
      >
        {submitLabel}
      </button>

   </div>
   </form>
  )
})

export default ProductForm
