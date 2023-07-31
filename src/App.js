import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectPage from "./Project";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Project" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
};

export default App;
