import Navbar from './components/navbar/navbar.jsx'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Aboutus from './pages/Aboutus/aboutus.jsx'
import Contactus from './pages/ContactUs/Contactus.jsx'
import Articles from './pages/Articles/Articles.jsx'
import Donation from './pages/Donation/Donation.jsx'
import Newsletter from './pages/Newsletter/Newsletter.jsx'
function App() {
  return (
    <>
      <div className="bg-[var(--color-bg)] w-full h-full relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/Donation" element={<Donation />} />
          <Route path='/Newsletter' element={<Newsletter />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App