import React, { FormEvent, ChangeEvent, useState } from 'react';

import { v4 } from 'uuid';
import Header from '@/app/(components)/Header';

import { ProductFormData } from './types';

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: '',
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCreate(formData);
    onClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]:
        name === 'price' || name === 'stockQuantity' || name === 'rating'
          ? parseFloat(value)
          : value,
    });
  };

  if (!isOpen) return null;

  const labelClasses = 'block text-sm font-medium text-gray-700';
  const inputClasses =
    'block w-full mb-2 p-2 border-gray-500 border-2 rounded-md';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Product" />
        <form
          className="mt-5"
          onSubmit={handleSubmit}
        >
          {/* NAME */}
          <label
            className={labelClasses}
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            className={inputClasses}
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
          />
          {/* PRICE */}
          <label
            className={labelClasses}
            htmlFor="price"
          >
            Price
          </label>
          <input
            className={inputClasses}
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
          />
          {/* STOCK QUANTITY */}
          <label
            className={labelClasses}
            htmlFor="stockQuantity"
          >
            Stock Quantity
          </label>
          <input
            className={inputClasses}
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
          />
          {/* RATING */}
          <label
            className={labelClasses}
            htmlFor="rating"
          >
            Rating
          </label>
          <input
            className={inputClasses}
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
          />

          {/* BUTTONS */}
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              type="submit"
            >
              Create
            </button>
            <button
              className="bg-gray-500 text-white rounded hover:bg-gray-700 ml-2 px-4 py-2"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
