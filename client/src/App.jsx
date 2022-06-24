import "./App.scss";
import Header from "./components/Header/Header.component";
import Footer from "./components/Footer/Footer.component";
import Home from "./pages/Home/Home.page";

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
