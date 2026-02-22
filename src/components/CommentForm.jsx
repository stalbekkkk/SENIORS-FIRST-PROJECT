import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, ensureAuth } from "../FireBase/FireBase";

export default function CommentForm({ postId }) {
  const [text, setText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;

    const user = await ensureAuth();

    const docRef = await addDoc(collection(db, "comments"), {
      postId,
      text: t,
      authorId: user.uid,
      authorName: "Anonymous",
      createdAt: serverTimestamp(),
    });

    console.log("COMMENT CREATED:", docRef.id);
    setText("");
  };

  return (
    <div className="formCard">
      <form className="formRow" onSubmit={onSubmit}>
        <input
          placeholder="Write comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btnPrimary" type="submit">Send</button>
      </form>
    </div>
  );
}