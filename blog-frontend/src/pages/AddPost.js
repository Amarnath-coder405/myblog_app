import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: { en: "" },
    excerpt: "",
    content: "",
    categories: "",
    imageUrl: "",
    publishDate: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "titleEn") setPost((prev) => ({ ...prev, title: { en: value } }));
    else setPost((prev) => ({ ...prev, [name]: value }));
  };

  // Convert comma-separated categories into objects
  const formatCategories = (str) =>
    str
      ? str.split(",").map((cat, index) => ({ id: `cat${Date.now()}${index}`, name: cat.trim() }))
      : [];

  // Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!post.title.en.trim() || !post.content.trim()) {
      setError("English title and content are required.");
      return;
    }
    if (!post.publishDate) {
      setError("Publish date is required.");
      return;
    }

    setLoading(true);

    const postData = {
      ...post,
      categories: formatCategories(post.categories),
      videoUrl: post.videoUrl || "",
    };

    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add post");
      }

      navigate("/admin");
    } catch (err) {
      setError("AddPost Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h2>Add New Post</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title (English)</label>
          <input
            type="text"
            name="titleEn"
            value={post.title.en}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter English title"
            required
          />
        </div>

        <div className="mb-3">
          <label>Excerpt</label>
          <input
            type="text"
            name="excerpt"
            value={post.excerpt}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            className="form-control"
            rows="6"
            required
          />
        </div>

        <div className="mb-3">
          <label>Categories (comma separated)</label>
          <input
            type="text"
            name="categories"
            value={post.categories}
            onChange={handleChange}
            className="form-control"
            placeholder="JavaScript, React"
          />
        </div>

        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Publish Date</label>
          <input
            type="date"
            name="publishDate"
            value={post.publishDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
  );
}
