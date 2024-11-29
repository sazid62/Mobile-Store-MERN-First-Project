
// @ts-nocheck
import Navbar from "@/components/Pages/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "@/components/Pages/Home";
import CreatePages from "@/components/Pages/CreatePages";
import { ThemeProvider } from "./components/theme-provider";
import { ToastSimple } from "@/components/Pages/showtoast";


export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/toast" element={<ToastSimple />} />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={
            <div className="bg-white dark:bg-gray-900">
              <CreatePages />
            </div>
          } />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
