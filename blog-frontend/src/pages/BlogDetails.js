import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ---------------------------
// Share Section Component
// ---------------------------
function ShareSection({ links }) {
  return (
    <div className="mt-4">
      <h4 className="fw-semibold mb-3">Share this article</h4>
      <div className="d-flex flex-wrap gap-2">
        {Object.entries(links).map(([name, url], i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark btn-sm px-3"
          >
            {name}
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// Comments Section Component
// ---------------------------
function CommentsSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${postId}`);
    if (savedComments) setComments(JSON.parse(savedComments));
  }, [postId]);

  useEffect(() => {
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
  }, [comments, postId]);

  const addComment = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newComment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toLocaleString(),
    };

    setComments([newComment, ...comments]);
    setName("");
    setText("");
  };

  return (
    <div className="mt-5">
      <h4 className="fw-semibold mb-3">Comments</h4>

      <form onSubmit={addComment} className="mb-4">
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-dark w-100">
          Post Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        <div className="list-group">
          {comments.map((c) => (
            <div key={c.id} className="list-group-item">
              <strong>{c.name}</strong>
              <p className="mb-1">{c.text}</p>
              <small className="text-muted">{c.date}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------
// Lazy Loaded Components
// ---------------------------
const LazyShare = lazy(() => Promise.resolve({ default: ShareSection }));
const LazyComments = lazy(() => Promise.resolve({ default: CommentsSection }));

// ---------------------------
// Main BlogDetails Component
// ---------------------------
export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [error, setError] = useState("");

  // Fetch post data
  useEffect(() => {
    if (!id) {
      setError("Invalid post ID");
      setLoadingPost(false);
      return;
    }

    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Post not found");

        const data = await res.json();

        setPost({
          id: data.id || data._id,
          title: data.title?.en || data.title || "Untitled",
          content: data.content || "",
          categories: Array.isArray(data.categories)
            ? data.categories.map((c) => (typeof c === "string" ? c : c.name))
            : [],
          imageUrl: data.imageUrl || "",
          publishDate: data.publishDate
            ? new Date(data.publishDate).toLocaleDateString()
            : "",
          author: data.author?.name || "Unknown",
        });
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
    return () => controller.abort();
  }, [id]);

  // Memoized social share links
  const shareLinks = useMemo(() => {
    if (!post) return {};
    const pageUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);

    return {
      Facebook: `https://facebook.com/sharer/sharer.php?u=${pageUrl}`,
      Twitter: `https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`,
      WhatsApp: `https://wa.me/?text=${title}%20${pageUrl}`,
      LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    };
  }, [post]);

  // Loading UI
  if (loadingPost)
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-dark" role="status" />
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="text-center py-5">
        <h5 className="text-danger mb-3">{error}</h5>
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );

  if (!post)
    return (
      <div className="text-center py-5">
        <h5 className="text-danger">Post not available</h5>
        <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );

  return (
    <div className="container py-4" style={{ maxWidth: "850px" }}>
      {/* Featured Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="img-fluid rounded mb-4 shadow-sm"
          loading="lazy"
        />
      )}

      {/* Blog Content */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h1 className="fw-bold">{post.title}</h1>
          <p className="text-muted">
            By <strong>{post.author}</strong> • {post.publishDate}
          </p>

          {/* Categories */}
          <div className="mb-3">
            {post.categories.map((cat, idx) => (
              <span key={idx} className="badge bg-dark me-1">
                {cat}
              </span>
            ))}
          </div>

          {/* Post content */}
          <div
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <Suspense fallback={<p>Loading share tools...</p>}>
            <LazyShare links={shareLinks} />
          </Suspense>

          {/* Comments Section */}
          <Suspense fallback={<p>Loading comments...</p>}>
            <LazyComments postId={post.id} />
          </Suspense>

          {/* Back Button */}
          <button
            className="btn btn-dark mt-4"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
