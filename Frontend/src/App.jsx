import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import User from "./pages/User";
import "./styles/index.scss";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";
import Dashboard from "./pages/Banker/Dashboard";
import Client from "./pages/Banker/Client";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Signin />} />

            {/* User */}
            <Route element={<PrivateRoute role={2502} />}>
              <Route path="/profile" element={<User />} />
            </Route>

            {/* Banker */}
            <Route element={<PrivateRoute role={1406} />}>
              <Route path="/panel/banker" element={<Dashboard />} />
              <Route path="/panel/banker/users/:id" element={<Client />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
