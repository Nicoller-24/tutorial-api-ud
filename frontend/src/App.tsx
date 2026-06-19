import { Route, Routes } from "react-router-dom";

import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ToastContainer } from "./components/ui/Toast";
import { ToastProvider } from "./hooks/useToast";
import { CreateTutorialPage } from "./pages/CreateTutorialPage";
import { DashboardPage } from "./pages/DashboardPage";
import { TutorialDetailPage } from "./pages/TutorialDetailPage";

export default function App() {
  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tutorials/new" element={<CreateTutorialPage />} />
            <Route path="/tutorials/:id" element={<TutorialDetailPage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}
