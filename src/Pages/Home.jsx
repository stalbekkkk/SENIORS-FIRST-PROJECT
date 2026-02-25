import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link } from "react-router-dom";

import { db, ensureAuth } from "../FireBase/FireBase";
import PostItem from "../components/PostItem";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      await ensureAuth();

      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPosts(data);
      });

      return () => unsub();
    })();
  }, []);

  return (
    <div className="page">
      <div className="topBar">
        <h2 className="hTitle" style={{ margin: 0 }}>All posts</h2>

        <Link className="btnCreate" to="/create">
          + Create post
        </Link>
      </div>

      <div className="postsGrid">
        {posts.map((p) => (
          <PostItem key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}