import "tailwindcss/tailwind.css";
import AdminTable from "./components/AdminTable/admintable";
import Scriptpage from "./components/scriptpage/scriptpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AdminTable />} />
          <Route path="/script" element={<Scriptpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
