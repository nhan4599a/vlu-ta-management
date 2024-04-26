// import Login from './authentication/Login'
import MainNavBar from "./components/MainNavbar/MainNavBar";
import "./index.css";
import Home from "./page/Home";

function App() {
  return (
    <div className="w-100 h-100">
      <MainNavBar />
      <Home />
    </div>
  );
}

export default App;
