import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home, { loader as homeLoader, action as homeAction } from './routes/Home';
import Invoice, { loader as invoiceLoader } from './routes/SingleInvoicePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: homeLoader,
    action: homeAction,
  },
  {
    path: "/invoices/:invoiceId",
    element: <Invoice />,
    loader: invoiceLoader
  },
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
