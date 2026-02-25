import { Link } from "react-router-dom";

function formatDate(ts) {
  if (!ts) return "";
  if (ts?.seconds) return new Date(ts.seconds * 1000).toLocaleDateString();
  try {
    return new Date(ts).toLocaleDateString();
  } catch {
    return "";
  }
}

export default function PostItem({ post }) {
  return (
    <div className="postCard">
      {post.imageUrl && (
        <img className="postCover" src={post.imageUrl} alt={post.title} />
      )}

      <div className="postBody">
        <div className="postMetaRow">
          <span className="postCategory">{post.category || "Design"}</span>

          <Link className="postOpen" to={`/post/${post.id}`} title="Open">
            ↗️
          </Link>
        </div>

        <h3 className="postTitle">{post.title}</h3>

        <p className="postDesc">
          {post.description || (post.content ? `${post.content.slice(0, 90)}...` : "")}
        </p>
      </div>

      <div className="postFooter">
        <img
          className="avatar"
          src={post.authorAvatar || "https://i.pravatar.cc/80?img=12"}
          alt={post.authorName || "Author"}
        />
        <div className="authorBlock">
          <span className="authorName">{post.authorName || "Anonymous"}</span>
          <span className="postDate">{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}