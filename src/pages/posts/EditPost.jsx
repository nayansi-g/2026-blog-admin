import { CircleX, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    body: "",
    image: null,
    published: false,
  })


  const fetchPost = async () => {
    try {
      const res = await fetch(`http://localhost:8000/posts/${id}`)
      const data = await res.json()
      const post = data.getSinglePost
      setFormData({
        title: post.title,
        description: post.description,
        category: post.category,
        body: post.body,
        image: post.image, // string path
        published: post.published,
      })
    } catch (error) {
      console.log(error)
    }
  }

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

  useEffect(() => {
    fetchPost()
  }, [id]);


  const fetchUpdate = async (e) => {
    e.preventDefault()
    try {

      const PostData = new FormData();


      PostData.append("title", formData.title);
      PostData.append("description", formData.description);
      PostData.append("category", formData.category);
      PostData.append("body", formData.body);
      PostData.append("published", formData.published);

      // only send image if user selected new one
      if (formData.image instanceof File) {
        PostData.append("image", formData.image);
      }

      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/posts/update/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: PostData
      })
      const data = await res.json()
      console.log(data.updatedPost)
      alert("✅ Post updated successfully");
      navigate("/admin/Posts")


    } catch (error) {
      console.log(error)
    }

  }

  return <div>
    <div className="max-w-4xl bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Post
      </h1>

      <form onSubmit={fetchUpdate} className="space-y-2">


        <div>
          <label className="block text-sm font-medium mb-1">
            Post title
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            required
            value={formData.title}
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
            value={formData?.description}
            onChange={handleChange}
            className="w-full resize-none border rounded-md px-3 py-2"
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">
            Post Images
          </label>
          {formData.image && (
            <img
              src={
                formData.image instanceof File
                  ? URL.createObjectURL(formData.image)
                  : `http://localhost:8000/uploads/${formData.image}`
              }
              alt="post"
              className="w-32 h-32 object-cover border mb-2"
            />
          )}

          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full border rounded-md px-3 py-2 hidden"
            onChange={handleChange}
          />

        </div>





        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            required
            value={formData?.category}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>


        <div>
          <label className="block text-sm font-medium mb-1">
            Body
          </label>
          <textarea
            type="text"
            name="body"
            onChange={handleChange}
            value={formData?.body}
            className="w-full border h-screen rounded-md px-3 py-2"
          />
        </div>

        <div className="flex gap-1 justify-start my-8 items-center">
          <input
            type="checkbox"
            name="published"
            checked={formData?.published}
            onChange={handleChange}
          />
          <label className="block text-sm font-medium mb-1">
            published
          </label>

        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Edit Post
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
  </div>
}

export default EditPost;


