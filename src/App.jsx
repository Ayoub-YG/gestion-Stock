import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Dashboard from "./Component/DashboardArticle";
import DashMaga from "./Component/DashboardMaga"
import DashboardFourn from "./Component/DashBoardFourn"
import DashboardMagasin from "./Component/DashboardMagasin"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/DashMaga" element={<DashMaga />}></Route>
        <Route path="/DashboardFourn" element={<DashboardFourn />}></Route>
        <Route path="/DashboardMagasin" element={<DashboardMagasin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
