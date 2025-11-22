import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Post not found");
        }
        const data = await res.json();

        setPost({
          title: data.title || { en: "" },
          excerpt: data.excerpt || "",
          content: data.content || "",
          categories: data.categories ? data.categories.map((c) => c.name).join(", ") : "",
          imageUrl: data.imageUrl || "",
          publishDate: data.publishDate ? data.publishDate.split("T")[0] : "",
          videoUrl: data.videoUrl || "",
        });
      } catch (err) {
        setError("Failed to fetch post: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "titleEn") setPost((prev) => ({ ...prev, title: { en: value } }));
    else setPost((prev) => ({ ...prev, [name]: value }));
  };

  const formatCategories = (str) =>
    str
      ? str.split(",").map((cat, index) => ({ id: `cat${Date.now()}${index}`, name: cat.trim() }))
      : [];

  const handleUpdate = async (e) => {
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

    setSaving(true);

    const postData = {
      ...post,
      categories: formatCategories(post.categories),
      videoUrl: post.videoUrl || "",
    };

    try {
      const res = await fetch(`http://localhost:3001/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update post");
      }

      navigate("/admin");
    } catch (err) {
      setError("EditPost Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4" style={{ maxWidth: "700px" }}>
      <h2>Edit Post</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Title (English)</label>
          <input
            type="text"
            name="titleEn"
            value={post.title.en}
            onChange={handleChange}
            className="form-control"
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

        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
