// src/Pages/CreatePost.jsx
import { Link } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";

export default function CreatePost() {
  return (
    <div className="container">
      <div className="topHeader">
        <Link
          to="/"
          style={{ textDecoration: "none", color: "#7b61ff", fontWeight: 700 }}
        >
          ← Back
        </Link>
      </div>

      <div className="hero" style={{ marginTop: 0 }}>
        <h1 className="heroTitle" style={{ marginTop: 10 }}>
          Create post
        </h1>
        <p className="heroSub">
          Add a new post with image, author and full text.
        </p>
      </div>

      <CreatePostForm />
    </div>
  );
}