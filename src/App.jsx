import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import MainRoutes from "./Routes/MainRoutes";
import AdminRoutes from "./Routes/AdminRoutes";
import AuthRoutes from "./Routes/AuthRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User üçün əsas səhifələr */}
        <Route path="/*" element={<Layout />}>
          <Route path="*" element={<MainRoutes />} />
        </Route>

        {/* Admin üçün ayrıca route */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Login və Auth səhifələri */}
        <Route path="/login/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
