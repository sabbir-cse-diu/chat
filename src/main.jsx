import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './firebaseConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';

import {createBrowserRouter,RouterProvider} from "react-router-dom";

import Registration from './pages/Registration/Registration.jsx';
import LogIn from './pages/LogIn/LogIn.jsx';
const router = createBrowserRouter([

  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/login",
    element: <LogIn></LogIn>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
)
