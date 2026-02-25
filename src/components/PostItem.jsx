import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  return (
    <div className="postCard">
      {post.imageUrl && (
        <img className="postCover" src={post.imageUrl} alt={post.title} />
      )}

      <div className="postBody">
        <div className="postCategory">{post.category || "Design"}</div>
        <h3 className="postTitle">{post.title}</h3>
        <p className="postDesc">{post.description || ""}</p>

        <Link className="btnMore" to={`/post/${post.id}`}>
          Узнать больше →
        </Link>
      </div>
    </div>
  );
}