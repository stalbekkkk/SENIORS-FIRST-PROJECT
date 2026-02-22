import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../FireBase/FireBase";

export default function CommentList({ postId, user }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      console.log("COMMENTS:", data);
      setComments(data);
    });

    return () => unsub();
  }, [postId]);

  const onDelete = async (commentId) => {
    await deleteDoc(doc(db, "comments", commentId));
    console.log("COMMENT DELETED:", commentId);
  };

  return (
    <div className="formCard">
      {comments.length === 0 && <div style={{ color: "#667085" }}>No comments yet</div>}

      {comments.map((c) => (
        <div key={c.id} style={{ borderBottom: "1px solid #eef0f3", padding: "10px 0" }}>
          <div style={{ fontWeight: 700, color: "#101828" }}>{c.text}</div>
          <div style={{ fontSize: 12, color: "#667085", marginTop: 4 }}>by {c.authorName}</div>

          {c.authorId && user?.uid === c.authorId && (
            <button
              onClick={() => onDelete(c.id)}
              className="btnDanger"
              style={{ marginTop: 10 }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}