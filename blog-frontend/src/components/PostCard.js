import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="card mb-4 shadow-sm">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          className="card-img-top"
          alt={post.title}
          style={{ objectFit: 'cover', height: '200px' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.excerpt}</p>

        {/* FIXED: Use MongoDB _id as post.id */}
        <Link to={`/post/${post.id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
}
