import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import PostsPage from "../pages/post";
import Login from "../pages/login";
import PostEdit from "../pages/post/postedit";
import PostNew from "../pages/post/postnew";
import Signin from "../pages/signin";
import PostPage from "../pages/post/postdetail";
import ProfilePage from "../pages/profile";

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  console.log("isAuthenticated : ", isAuthenticated);
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/new" element={<PostNew />} />
            <Route path="/posts/edit/:id" element={<PostEdit />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="signin" element={<Signin />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}
