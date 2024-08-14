import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/home";
import PostList from "../pages/post";
import Login from "../pages/login";
import PostEdit from "../pages/post/postedit";
import PostNew from "../pages/post/postnew";
import Signin from "../pages/signin";
import PostPage from "../pages/post/postdetail";
import ProfilePage from "../pages/profile";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/posts//new" element={<PostNew />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signin" element={<Signin />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
