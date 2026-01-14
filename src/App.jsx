
import {Routes,Route, Navigate} from "react-router-dom"
import Login from "./pages/auth/Login"
import AdminLayout from "./components/layout/AdminLayout"
import Dashboard from "./pages/dashboard/Dashboard"
import PostList from "./pages/posts/PostList"
import AddPost from "./pages/posts/AddPost"
import EditPost from "./pages/posts/EditPost"


function App() {


  return (
    <>
      <Routes>     
       <Route path="/" element={<Navigate to="/login" />} />
         <Route path="/login" element={<Login />} />
        {localStorage.getItem("token")? <Route path="/admin" element={<AdminLayout />}>
        {/* dashboard */}
        <Route path="/admin/dashboard" element={<Dashboard />}/>

        {/* Post routes */}
        <Route path="/admin/Posts" element={<PostList />} />
         <Route path="/admin/Posts/add" element={<AddPost />}></Route>
         <Route path="/admin/Posts/edit/:id" element={<EditPost />}></Route>

       </Route>:null}
      
     
      </Routes>
    </>
  )
}

export default App
