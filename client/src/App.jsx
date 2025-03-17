import Navbar from './components/navbar/navbar.jsx'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home/home.jsx'
function App() {
  return (
    <>
      <div className="bg-[var(--color-bg)] w-full h-full flex relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App