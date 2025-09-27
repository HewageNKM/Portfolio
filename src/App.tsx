// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./pages/NotFound";
import { Projects } from "./pages/Projects";
import { Blogs } from "./pages/Blogs";
import PageLayout from "./layout/PageLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout><Home /></PageLayout>} />
        <Route path="/projects" element={<PageLayout><Projects /></PageLayout>} />
        <Route path="/blogs" element={<PageLayout><Blogs /></PageLayout>}/>
        <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
      </Routes>
    </Router>
  );
}
