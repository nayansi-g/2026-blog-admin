import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    body: "",
    image: null,
    published:false
  });
 

  const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  if (type === "file") {
    setFormData({ ...formData, [name]: files[0] });
  } else if (type === "checkbox") {
    setFormData({ ...formData, [name]: checked });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handleSubmit = async(e) => {
    e.preventDefault();
  try {
      const PostData = new FormData();

    PostData.append("title", formData.title);
    PostData.append("description", formData.description);
    PostData.append("category", formData.category);
    PostData.append("body", formData.body);
    PostData.append("published", formData.published);
    PostData.append("image",formData.image);


   const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8000/posts/admin/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: PostData,
      });

      const data = await res.json();
      console.log("data")

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
      alert("✅ Post added successfully");
     setFormData({
    title: "",
    description: "",
    category: "",
    body: "",
    image: null,
    published:false
  })

    } catch (error) {
      console.error(error);
    }
  };




//   const handleImageChange = (e) => {
//   const files = Array.from(e.target.files);
//   setFormData({ ...formData, images: files });
// };

  return (
    <div className="max-w-4xl bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="1"
            value={formData.description}
            onChange={handleChange}
            className="w-full resize-none border rounded-md px-3 py-2"
          />
        </div>

              {/* Post Images */}
<div>
  <label className="block text-sm font-medium mb-1">
    Post Image
  </label>

  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleChange}
    className="w-full border rounded-md px-3 py-2"
  />
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Category 
            </label>
            <input
            type="text"
              name="category"
              required
              value={formData.category}
              placeholder="#AI, #JS and #DS"
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
            </input>
          </div>

        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium mb-1">
            body
          </label>
          <textarea
            type="text"
            name="body"
            required
            value={formData.body}
            onChange={handleChange}
            className="w-full h-screen border rounded-md px-3 py-2"
          />
        </div>

        


       
        <div className="flex gap-1 justify-start my-8 items-center">
          <input
             type="checkbox"
  name="published"
  checked={formData.published}
  onChange={handleChange}
          />
          <label className="block text-sm font-medium mb-1">
            published
          </label>
          
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Save Post
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/Posts")}
            className="border px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddPost;

