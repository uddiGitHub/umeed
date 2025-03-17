import Navbar from './components/navbar/navbar.jsx'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home/home.jsx'
import Aboutus from './pages/Aboutus/aboutus.jsx'
import Contactus from './pages/ContactUs/Contactus.jsx'
import Articles from './pages/Articles/Articles.jsx'
import Donation from './pages/Donation/Donation.jsx'
function App() {
  return (
    <>
      <div className="bg-[var(--color-bg)] w-full h-full flex relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/Donation" element={<Donation />} />
        </Routes>
      </div>
    </>
  )
}

export default App