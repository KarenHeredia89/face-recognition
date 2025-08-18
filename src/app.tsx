import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/components/hooks/useAuth";
import { ThemeProvider } from "@/components/themeProvider";
import Navigation from "@/components/navigation";
import Signin from "@/components/signin";
import Register from "@/components/register";
import Home from "@/components/home";

export default function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    return children;
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navigation />
      <div className="h-[calc(100vh-48px)] flex flex-col items-center p-8">
        <Routes>
          <Route path="/signin" element={<Signin />} />
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
            path="/"
            element={<Navigate to={user ? "/home" : "/signin"} replace />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
