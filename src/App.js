import Header from "./components/Header.js";
import FilterBar from "./components/FilterBar";
import ProductList from "./components/ProductList";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <FilterBar />
      <div className="content">
        <Sidebar />
        <ProductList />
      </div>
    </div>
  );
}

export default App;
