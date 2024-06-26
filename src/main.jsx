import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreatePost from './CreatePost.jsx'
import PostList from './PostList.jsx';
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element : <App/>, children: [
    {path : "/", element: <PostList/>},
    {path : "/createpost", element : <CreatePost/>},
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
