import { useState, useReducer, useEffect } from "react";
import { PostLister } from "./post-list-store";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  else if(action.type === "ADD_INITIAL_POSTS"){
    newPostList = action.payload.posts;
  }
  return newPostList;
};
export default function App() {
 // const [selectedTab, setselectedTab] = useState("Home");

  const [postList, dispatchPostList] = useReducer(postListReducer,[]);
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPosts = (posts)  =>{
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload :{
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };


  useEffect(() =>{
    // console.log('requresting start')
    setFetching(true)
    fetch('https://dummyjson.com/posts')
    .then(res => res.json())
    .then((data) => {
      addInitialPosts(data.posts);      //=> this is a function with argument post. and the above in postlistReducer we have created a function it will simply paint the data
      setFetching(false)
    });                                    //An Outlet should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
    }, []);

  return (
    <>
    
      <PostLister.Provider
        value={{
          postList,
          addPost,
          deletePost,
          fetching,
        }}
      >
        <div className="app-container">
          <Sidebar ></Sidebar>
          <div className="content">
            <Header></Header>
            <Outlet/>    
            <Footer></Footer>
          </div>
        </div>
      </PostLister.Provider>
    </>
  );
}
