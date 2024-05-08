import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user";
import { Start } from "./pages/start";
import { NavComponent } from "./components/nav";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Posts } from "./pages/posts";
import { Post } from "./pages/post";
import { Categories } from "./pages/categories";
import { PostsByCategory } from "./pages/postsByCategory";
import { AddPost } from "./pages/addPost";
import { AddCategory } from "./pages/addCategory";

function App() {
  return (
    <UserProvider>
      <div className="flex items-center justify-center h-screen">
        <BrowserRouter>
          <NavComponent />
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/posts/:slug" element={<PostsByCategory />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/addCategory" element={<AddCategory />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
