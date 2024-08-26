'use client';

import { useGetProductsQuery } from '@/state/api';

import Header from '../(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'productId',
    headerName: 'ID',
    width: 270,
  },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 200,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 110,
    type: 'number',
    valueGetter: (_value, row) => `$${row.price.toFixed(2)}`,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 110,
    type: 'number',
    valueGetter: (_value, row) =>
      row.rating ? `${row.rating.toFixed(2)} ⭐` : 'N/A',
  },
  {
    field: 'stockQuantity',
    headerName: 'Stock Quantity',
    width: 150,
    type: 'number',
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to find any products.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        className="bg-white shadow rounded-xl border border-gray-200 mt-5 !text-gray-700"
        rows={products}
        columns={columns}
        getRowId={row => row.productId}
        checkboxSelection
      />
    </div>
  );
};

export default Inventory;
