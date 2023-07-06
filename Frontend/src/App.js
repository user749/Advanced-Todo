import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingScreen } from "./screens/LandingScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { TodoScreen } from "./screens/Todoapp";

function App() {
  return (
    <ChakraProvider>
      <Router>
        {/* <Navbar /> */}
        <main>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/todos" element={<TodoScreen />} />
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </Router>
    </ChakraProvider>
  );
}

export default App;
