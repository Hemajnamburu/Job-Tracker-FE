import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Content } from "./pages/Content";
import { ApplicationForm } from "./pages/ApplicationForm";
import { AllApplications } from "./pages/Applications";
import { Companies } from "./pages/Companies";
import { UpcomingInterviews } from "./pages/InterviewsComponent";
import { AuthProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { useState } from "react";
import { LoginModal } from "./pages/LoginModal";
import ScheduleInterview from "./pages/addInterviewDetals";

export default function App() {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleLoginClick = (mode: "login" | "register") => {
    setAuthMode(mode);
    setShowLoginModal(true);
  };
  return (
    <AuthProvider>
      <main className="h-full">
        <Routes>
          <Route
            path="/landing"
            element={
              <>
                <LandingPage onLoginClick={handleLoginClick} />
                {showLoginModal && (
                  <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    initialMode={authMode}
                  />
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Content />} />
            <Route path="add-application" element={<ApplicationForm />} />
            <Route path="edit-application/:id" element={<ApplicationForm />} />
            <Route path="applications" element={<AllApplications />} />
            <Route path="companies" element={<Companies />} />
            <Route path="interviews" element={<UpcomingInterviews />} />
            <Route path="add-interview" element={<ScheduleInterview />} />
            <Route path="edit-interview/:id" element={<ScheduleInterview />} />
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </AuthProvider>
  );
}
