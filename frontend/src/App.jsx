import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DisasterAlerts from "./pages/DisasterAlerts";
import SeekResources from "./pages/SeekResources";
import ProvideResources from "./pages/ProvideResources";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/disaster-alerts" element={<DisasterAlerts />} />
                <Route path="/seek-resources" element={<SeekResources />} />
                <Route path="/provide-resources" element={<ProvideResources />} />
                
            </Routes>
        </Router>
    );
};

export default App;
