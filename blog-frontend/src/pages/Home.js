import React, { useEffect, useState, Suspense, lazy, useMemo } from "react";
import "./Home.css";

const PostCard = lazy(() => import("../components/PostCard"));

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [categories, setCategories] = useState([]);

  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = [
    "“Writing is the painting of the voice.” – Voltaire",
    "“The purpose of a blog is to share your story.”",
    "“Content is King, but engagement is Queen.”",
    "“Your blog is your personal space on the internet.”",
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3001/posts", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        if (!isMounted) return;

        const normalized = data.map((post) => ({
          id: post._id,
          title: post.title?.en || post.title || "Untitled",
          excerpt: post.excerpt || "",
          imageUrl: post.imageUrl || "",
          categories: post.categories?.map((c) => c.name) || [],
        }));

        setPosts(normalized);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.flatMap((p) => p.categories.map((c) => c.name)))
        );
        setCategories(uniqueCategories);
      } catch (err) {
        if (!isMounted) return;
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPosts();

    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  if (loading) return <p className="status-message">Loading posts...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!posts.length) return <p className="status-message">No posts found.</p>;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to My Blog</h1>
          <p className="hero-quote fade">{quotes[currentQuote]}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="category-select"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </section>

      {/* Posts Grid */}
      <section className="posts-section">
        <div className="posts-grid">
          {paginatedPosts.map((post) => (
            <Suspense
              key={post.id}
              fallback={<div className="post-placeholder">Loading...</div>}
            >
              <PostCard post={post} />
            </Suspense>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
