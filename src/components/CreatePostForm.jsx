import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, ensureAuth } from "../FireBase/FireBase";

const CATEGORIES = ["Design", "Product", "Management", "Software Engineering", "Customer Success"];

// ✅ Сжимаем картинку и делаем dataURL
function fileToCompressedDataUrl(file, { maxWidth, quality }) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File read error"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image load error"));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        // jpeg меньше по размеру, чем png
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [authorName, setAuthorName] = useState("");

  // ✅ вместо URL — будем хранить готовый dataURL
  const [postImageDataUrl, setPostImageDataUrl] = useState("");
  const [authorAvatarDataUrl, setAuthorAvatarDataUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const onPickPostImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToCompressedDataUrl(file, { maxWidth: 900, quality: 0.7 });
      setPostImageDataUrl(dataUrl);
      console.log("POST IMAGE SIZE (chars):", dataUrl.length);
    } catch (err) {
      console.error(err);
      alert("Не получилось прочитать картинку");
    }
  };

  const onPickAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await fileToCompressedDataUrl(file, { maxWidth: 96, quality: 0.75 });
      setAuthorAvatarDataUrl(dataUrl);
      console.log("AVATAR SIZE (chars):", dataUrl.length);
    } catch (err) {
      console.error(err);
      alert("Не получилось прочитать аватарку");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const t = title.trim();
    const desc = description.trim();
    const full = content.trim();
    const aName = authorName.trim();

    if (!t) return alert("Title жаз");
    if (!postImageDataUrl) return alert("Выбери картинку поста");
    if (!desc) return alert("Short description жаз");
    if (!full) return alert("Full text (content) жаз");
    if (!aName) return alert("Author name жаз");
    if (!authorAvatarDataUrl) return alert("Выбери аватар автора");

    try {
      setLoading(true);
      const user = await ensureAuth();

      const docRef = await addDoc(collection(db, "posts"), {
        title: t,
        category,
        description: desc,
        content: full,

        imageUrl: postImageDataUrl,        // ✅ теперь это dataURL
        authorName: aName,
        authorAvatar: authorAvatarDataUrl, // ✅ теперь это dataURL
        authorId: user.uid,

        createdAt: serverTimestamp(),
      });

      console.log("POST CREATED:", docRef.id);

      setTitle("");
      setCategory("Design");
      setDescription("");
      setContent("");
      setAuthorName("");
      setPostImageDataUrl("");
      setAuthorAvatarDataUrl("");

      // сброс input file (просто перерисовкой не всегда сбрасывается)
      e.target.reset();
    } catch (err) {
      console.error("CREATE POST ERROR:", err);
      alert("Ошибка создания поста (смотри console). Возможно картинка слишком большая.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formCard">
      <form className="formRow" onSubmit={onSubmit}>
        <input placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* ✅ Выбор картинки вместо URL */}
        <div>
          <div style={{ fontSize: 12, color: "#667085", marginBottom: 6 }}>Post image</div>
          <input type="file" accept="image/*" onChange={onPickPostImage} />
          {postImageDataUrl && (
            <img
              src={postImageDataUrl}
              alt="preview"
              style={{ width: "100%", maxWidth: 420, height: 180, objectFit: "cover", borderRadius: 12, marginTop: 10 }}
            />
          )}
        </div>

        <textarea
          placeholder="Short description (карточкага)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Full text / content (деталдуу баракчага)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Author name (мисалы: Olivia Rhye)"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        {/* ✅ Выбор аватарки вместо URL */}
        <div>
          <div style={{ fontSize: 12, color: "#667085", marginBottom: 6 }}>Author avatar</div>
          <input type="file" accept="image/*" onChange={onPickAvatar} />
          {authorAvatarDataUrl && (
            <img
              src={authorAvatarDataUrl}
              alt="avatar preview"
              style={{ width: 72, height: 72, borderRadius: 999, objectFit: "cover", marginTop: 10 }}
            />
          )}
        </div>

        <button className="btnPrimary" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}