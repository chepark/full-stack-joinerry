import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.component";
import Footer from "./components/Footer/Footer.component";
import Home from "./pages/Home/Home.page";
import SignUp from "./pages/SignUp/SignUp";
import Success from "./pages/Success/Success";
import LogIn from "./pages/LogIn/LogIn";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import PrivateOutlet from "./components/PrivateOutlet/PrivateOutlet";
import CreateProject from "./pages/CreateProject/CreateProject";
import EditProject from "./pages/EditProject/EditProject";
import Dashboard from "./pages/Dashboard/Dashboard";
import Posts from "./pages/Posts/Posts";
import Likes from "./pages/Likes/Likes";
import AccountSetting from "./pages/AccountSetting/AccountSetting";

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
          <Route path="/project/:id" element={<ProjectDetail />} />
          {/* insert into private outlet later. */}

          <Route element={<PrivateOutlet />}>
            <Route path="/project/create" element={<CreateProject />} />
            <Route path="/project/edit/:id" element={<EditProject />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="posts" element={<Posts />} />
              <Route path="likes" element={<Likes />} />
              <Route path="account-setting" element={<AccountSetting />} />
            </Route>
          </Route>
          {/* MOVE DASHBOARD INSIDE OF THE PRIVATE OUTLET */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
