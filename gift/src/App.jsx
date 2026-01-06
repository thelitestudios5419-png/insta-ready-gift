import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import OpenWhen from './pages/OpenWhen';
import Letter from './pages/Letter';
import TimeTogether from './pages/TimeTogether';
import VirtualHug from './pages/VirtualHug';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/open-when" element={<OpenWhen />} />
        <Route path="/open-when/:scenario" element={<Letter />} />
        <Route path="/time-together" element={<TimeTogether />} />
        <Route path="/virtual-hug" element={<VirtualHug />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
