import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all Posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch Posts");
        return;
      }

      setPosts(data.getAllPosts || data);
      console.log(data.getAllPosts)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete Post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Post?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8000/posts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("✅ Post deleted");
      fetchPosts(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>

        <button
          onClick={() => navigate("/admin/Posts/add")}
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
        >
          + Add Post
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading posts...</p>
      )}

      {/* Empty */}
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500">No posts found</p>
      )}

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              {post.image ? (
                <img
                  src={`http://localhost:8000/uploads/${post.image}`}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200" />
              )}

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {post.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {post.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {post.category}
                  </span>
                  <span>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 p-4 pt-0">
                <button
                  onClick={() =>
                    navigate(`/admin/Posts/edit/${post._id}`)
                  }
                  className="flex-1 bg-blue-500 text-white text-xs py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex-1 bg-red-500 text-white text-xs py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};


export default PostList;


