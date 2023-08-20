import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Signin from "./pages/SignIn";
import User from "./pages/User";
import "./styles/index.scss";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Signin />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<User />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
