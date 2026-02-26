import { Link } from "react-router-dom";

export default function HeroHeader({ search, setSearch }) {
  return (
    <>
      {/* top / mobile top */}
      <div className="topHeader">
        <div className="brandMini">Our blog</div>

        <Link className="btnCreate" to="/create">
          + Create post
        </Link>
      </div>

      {/* hero */}
      <div className="hero">
        <div className="brandMini">Our blog</div>
        <h1 className="heroTitle">Resources and insights</h1>
        <p className="heroSub">
          The latest industry news, interviews, technologies, and resources.
        </p>

        {/* search */}
        <div className="searchWrap">
          <div className="searchBox">
            <span className="searchIcon">🔍</span>
            <input
              className="searchInput"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}