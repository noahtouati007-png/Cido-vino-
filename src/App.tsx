import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ScanPage from "./pages/ScanPage";
import WineResultPage from "./pages/WineResultPage";
import DishPage from "./pages/DishPage";
import DishResultsPage from "./pages/DishResultsPage";
import HistoryPage from "./pages/HistoryPage";
import CavePage from "./pages/CavePage";
import SearchPage from "./pages/SearchPage";
import ComparePage from "./pages/ComparePage";
import BottomNav from "./components/BottomNav";
import Onboarding from "./components/Onboarding";
import InstallBanner from "./components/InstallBanner";

export default function App() {
  return (
    <BrowserRouter>
      <Onboarding />
      <div className="pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/wine/:barcode" element={<WineResultPage />} />
          <Route path="/dish" element={<DishPage />} />
          <Route path="/dish/results" element={<DishResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/cave" element={<CavePage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </div>
      <InstallBanner />
      <BottomNav />
    </BrowserRouter>
  );
}
