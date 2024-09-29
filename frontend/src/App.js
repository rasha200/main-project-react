import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth"; // Adjust the path accordingly
import LandingPage from "./Landingpage"; // Adjust the path accordingly

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/landing" element={<LandingPage />} />
                {/* other routes */}
            </Routes>
        </Router>
    );
}

export default App;
