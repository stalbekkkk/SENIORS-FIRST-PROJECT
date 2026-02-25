import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, ensureAuth } from "../FireBase/FireBase";

import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      await ensureAuth();
      const snap = await getDoc(doc(db, "posts", postId));
      if (snap.exists()) setPost({ id: snap.id, ...snap.data() });
    })();
  }, [postId]);

  const onDeletePost = async () => {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;

    await deleteDoc(doc(db, "posts", postId));
    console.log("POST DELETED:", postId);
    navigate("/");
  };

  if (!post) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <Link to="/">← Back</Link>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h2 className="hTitle" style={{ marginTop: 10 }}>{post.title}</h2>
        <button className="btnDanger" onClick={onDeletePost}>Delete Post</button>
      </div>

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{ width: "100%", maxWidth: 900, height: 320, objectFit: "cover", borderRadius: 16 }}
        />
      )}

      <p style={{ color: "#101828", maxWidth: 900, marginTop: 12, lineHeight: 1.6 }}>
        {post.content}
      </p>

      <div className="hr" />

      <h3 style={{ margin: "0 0 10px" }}>Comments</h3>
      <CommentForm postId={postId} />
      <CommentList postId={postId} user={auth.currentUser} />
    </div>
  );
}