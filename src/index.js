import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Hero from "./routes/Hero";
import About from "./routes/About";
import TokenOfLove from "./routes/TokenOfLove";
import TokenOfFriendship from "./routes/TokenOfFriendship";
import AcceptLove from "./routes/AcceptLove";
import AcceptFriendship from "./routes/AcceptFriendship";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="love" element={<TokenOfLove />} />
        <Route path="love/accept" element={<AcceptLove />} />
        <Route path="friendship" element={<TokenOfFriendship />} />
        <Route path="friendship/accept" element={<AcceptFriendship />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
