import "App.css";
import { GlobalStyle } from "config/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "routes/Login";
import Home from "routes/Home";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
