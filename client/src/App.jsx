import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.component";
import Footer from "./components/Footer/Footer.component";
import Home from "./pages/Home/Home.page";
import SignUp from "./pages/SignUp/SignUp";
import SignUpSuccess from "./pages/SignUp/SignUpSuccess";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/signup/success" element={<SignUpSuccess />} /> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
