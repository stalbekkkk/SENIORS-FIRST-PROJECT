import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db, ensureAuth } from "../FireBase/FireBase";
import PostItem from "../components/PostItem";
import HeroHeader from "../components/HeroHeader";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  let unsub = () => {};

  ensureAuth().then(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(data);
    });
  });

  return () => unsub();
}, []);

  // ✅ search filter (title/description/category/author)
  const filteredPosts = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return posts;

    return posts.filter((p) => {
      const hay = [
        p.title,
        p.description,
        p.category,
        p.authorName,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(s);
    });
  }, [posts, search]);

  return (
    <div className="container">
      <HeroHeader search={search} setSearch={setSearch} />

      <div className="postsGrid">
        {filteredPosts.map((p) => (
          <PostItem key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}