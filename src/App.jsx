import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import PostDetails from "./Pages/PostDetails";
import CreatePost from "./Pages/CreatePost";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/post/:postId" element={<PostDetails />} />
    </Routes>
  );
}