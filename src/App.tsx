// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Home";
import NotFound from "./pages/NotFound";
import { Projects } from "./pages/Projects";
import { Blogs } from "./pages/Blogs";
import PageLayout from "./layout/PageLayout";
import { ContactMe } from "./pages/ContactMe";
import BlogDetails from "./pages/BlogDetails";

// Admin Pages
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/AdminRoute";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import ProjectList from "./pages/admin/ProjectList";
import ProjectEditor from "./pages/admin/ProjectEditor";
import EducationList from "./pages/admin/EducationList";
import EducationEditor from "./pages/admin/EducationEditor";
import AchievementList from "./pages/admin/AchievementList";
import AchievementEditor from "./pages/admin/AchievementEditor";
import TechStackList from "./pages/admin/TechStackList";
import TechStackEditor from "./pages/admin/TechStackEditor";
import ExperienceList from "./pages/admin/ExperienceList";
import ExperienceEditor from "./pages/admin/ExperienceEditor";

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PageLayout>
              <Home />
            </PageLayout>
          }
        />
        <Route
          path="/projects"
          element={
            <PageLayout>
              <Projects />
            </PageLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <PageLayout>
              <Blogs />
            </PageLayout>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <PageLayout>
              <BlogDetails />
            </PageLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PageLayout>
              <ContactMe />
            </PageLayout>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/admin/blogs/new" element={<BlogEditor />} />
          <Route path="/admin/blogs/edit/:id" element={<BlogEditor />} />
          <Route path="/admin/projects" element={<ProjectList />} />
          <Route path="/admin/projects/new" element={<ProjectEditor />} />
          <Route path="/admin/projects/edit/:id" element={<ProjectEditor />} />

          <Route path="/admin/education" element={<EducationList />} />
          <Route path="/admin/education/new" element={<EducationEditor />} />
          <Route
            path="/admin/education/edit/:id"
            element={<EducationEditor />}
          />

          <Route path="/admin/achievements" element={<AchievementList />} />
          <Route
            path="/admin/achievements/new"
            element={<AchievementEditor />}
          />
          <Route
            path="/admin/achievements/edit/:id"
            element={<AchievementEditor />}
          />

          <Route path="/admin/tech-stacks" element={<TechStackList />} />
          <Route path="/admin/tech-stacks/new" element={<TechStackEditor />} />
          <Route
            path="/admin/tech-stacks/edit/:id"
            element={<TechStackEditor />}
          />

          <Route path="/admin/experiences" element={<ExperienceList />} />
          <Route path="/admin/experiences/new" element={<ExperienceEditor />} />
          <Route path="/admin/experiences/:id" element={<ExperienceEditor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
