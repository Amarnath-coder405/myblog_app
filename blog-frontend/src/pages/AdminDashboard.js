import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== Fetch posts =====
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:3001/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');

        const data = await res.json();

        // Normalize posts safely
        const formattedPosts = data
          .map(post => {
            const id = post.id ?? post._id ?? null;
            if (!id) return null; // skip posts without ID

            // Normalize title: English fallback or first available
            let title = '';
            if (typeof post.title === 'object' && post.title !== null) {
              title = post.title.en || Object.values(post.title)[0] || 'Untitled';
            } else {
              title = String(post.title || 'Untitled');
            }

            return {
              ...post,
              id: id.toString(),
              title,
              author: post.author?.name || post.author || 'Unknown',
              publishDate: post.publishDate || null,
            };
          })
          .filter(Boolean); // remove nulls

        setPosts(formattedPosts);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ===== Delete post with optimistic UI update =====
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const prevPosts = [...posts];
    setPosts(prev => prev.filter(post => post.id !== id));

    try {
      const res = await fetch(`http://localhost:3001/posts/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete post');
    } catch (err) {
      setError(err.message || 'Failed to delete post');
      setPosts(prevPosts); // rollback
    }
  };

  // ===== Memoized table rows =====
  const postRows = useMemo(() => {
    return posts.map(post => (
      <tr key={post.id}>
        <td>{post.title}</td>
        <td>{post.author}</td>
        <td>{post.publishDate ? dayjs(post.publishDate).format('MMM D, YYYY') : '-'}</td>
        <td>
          <button
            className="btn btn-sm btn-warning me-2 mb-1"
            onClick={() => navigate(`/admin/edit/${post.id}`)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger mb-1"
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }, [posts, navigate]);

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h2 className="mb-3 mb-md-0">Admin Dashboard</h2>
        <button className="btn btn-success" onClick={() => navigate('/admin/new')}>
          Add New Post
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* No posts */}
      {!loading && posts.length === 0 && (
        <p className="text-center">No posts available.</p>
      )}

      {/* Posts Table */}
      {!loading && posts.length > 0 && (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{postRows}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
