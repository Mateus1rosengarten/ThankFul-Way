import "./App.css";
import Auth from "./pages/authentication";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";
import ProfilePage from "./pages/profilePage";
import PostPage from "./pages/postPage";

function App() {
 

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/blog"
          element={
            <div className="App">
              <PostPage />
            </div>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/" element={<Auth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
