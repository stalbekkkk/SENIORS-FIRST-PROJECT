import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, ensureAuth } from "../FireBase/FireBase";

const CATEGORIES = ["Design", "Product", "Management", "Software Engineering", "Customer Success"];

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Design");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const t = title.trim();
    const img = imageUrl.trim();
    const desc = description.trim();

    if (!t) return alert("Напиши title");
    if (!img) return alert("Вставь Image URL (например https://picsum.photos/600/400)");
    if (!desc) return alert("Напиши description");

    try {
      setLoading(true);
      const user = await ensureAuth();

      const docRef = await addDoc(collection(db, "posts"), {
        title: t,
        imageUrl: img,
        category,
        description: desc,
        authorId: user.uid,
        authorName: "Anonymous",
        authorAvatar: "https://i.pravatar.cc/80?img=12",
        createdAt: serverTimestamp(),
      });

      console.log("POST CREATED:", docRef.id);

      setTitle("");
      setImageUrl("");
      setDescription("");
      setCategory("Design");
    } catch (err) {
      console.error("CREATE POST ERROR:", err);
      alert("Ошибка создания поста (смотри console)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formCard">
      <form className="formRow" onSubmit={onSubmit}>
        <input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          placeholder="Image URL (например https://picsum.photos/600/400)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <textarea
          placeholder="Short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btnPrimary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}