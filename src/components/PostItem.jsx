import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  return (
    <div className="postCard">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="postImage"
      />

      <div className="postBody">
        <div className="postCategory">{post.category}</div>

        <h3 className="postTitle">{post.title}</h3>

        <p className="postDesc">{post.description}</p>

        <Link to={`/post/${post.id}`} className="btnMore">
          Узнать больше →
        </Link>

        {/* 👇 ВОТ ТУТ АВАТАР */}
        <div className="postAuthor">
          {post.authorAvatar && (
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="authorAvatar"
            />
          )}

          <div className="authorInfo">
            <div className="authorName">{post.authorName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}