import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.component";
import Footer from "./components/Footer/Footer.component";
import Home from "./pages/Home/Home.page";
import SignUp from "./pages/SignUp/SignUp";
import Success from "./pages/Success/Success";
import LogIn from "./pages/LogIn/LogIn";
import PrivateOutlet from "./components/PrivateOutlet/PrivateOutlet";
import CreateProject from "./pages/CreateProject/CreateProject";
import EditProject from "./pages/EditProject/EditProject";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/success" element={<Success />} />

          {/* insert into private outlet later. */}
          <Route path="/project/create" element={<CreateProject />} />
          <Route element={<PrivateOutlet />}>
            <Route path="/project/edit" element={<EditProject />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
