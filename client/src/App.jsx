import "./App.scss";
import Header from "./components/Header/Header.component";
import Footer from "./components/Footer/Footer.component";
import Home from "./pages/Home/Home.page";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Home /> */}
      <SignUp />
      <Footer />
    </div>
  );
}

export default App;
