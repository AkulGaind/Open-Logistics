import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./views/HomePage";
import Navbar from "./components/layout/navbar";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import Dashboard from "./views/Dashboard";
import Footer from "./components/layout/footer";
import LoadPostingPage from "./views/LoadPostingPage";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loadposting" element={<LoadPostingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
