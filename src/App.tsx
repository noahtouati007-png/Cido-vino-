import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ScanPage from "./pages/ScanPage";
import WineResultPage from "./pages/WineResultPage";
import DishPage from "./pages/DishPage";
import DishResultsPage from "./pages/DishResultsPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/wine/:barcode" element={<WineResultPage />} />
        <Route path="/dish" element={<DishPage />} />
        <Route path="/dish/results" element={<DishResultsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
