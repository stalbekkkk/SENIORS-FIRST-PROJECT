import { Link } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";

export default function CreatePost() {
  return (
    <div className="page">
      <Link to="/">← Back</Link>
      <h2 className="hTitle" style={{ marginTop: 10 }}>Create post</h2>
      <CreatePostForm />
    </div>
  );
}