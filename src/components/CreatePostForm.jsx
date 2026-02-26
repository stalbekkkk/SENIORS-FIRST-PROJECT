import { Link } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";

export default function CreatePost() {
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

      <div className="fileBox">
        <div className="formLabel">Post image</div>
        <input type="file" accept="image/*" onChange={onPickPostImage} />
        {postImageDataUrl && (
          <img
            src={postImageDataUrl}
            alt="preview"
            style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 14, marginTop: 10 }}
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

      <div className="fileBox">
        <div className="formLabel">Author avatar</div>
        <input type="file" accept="image/*" onChange={onPickAvatar} />
        {authorAvatarDataUrl && (
          <img
            src={authorAvatarDataUrl}
            alt="avatar preview"
            style={{ width: 72, height: 72, borderRadius: 999, objectFit: "cover", marginTop: 10 }}
          />
        )}
      </div>

      <button className="btnCreate" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  </div>
);
}