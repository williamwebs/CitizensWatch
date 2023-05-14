import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import {
  Dashboard,
  Explore,
  Home,
  Login,
  Post,
  PostForm,
  Register,
  SingleReport,
} from "./config";

function App() {
  const currentUser  = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home/:id"
          element={
            <ProtectedRoute>
              <SingleReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postForm"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
