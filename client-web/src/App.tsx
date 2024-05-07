import { BrowserRouter, Route, Routes } from "react-router-dom";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}