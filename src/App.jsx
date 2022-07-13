import Home from './pages/Home'
import EasterEgg from './pages/EasterEgg'
import { Route, Routes } from 'react-router-dom'

export default function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/easteregg' element={<EasterEgg />} />
        </Routes>
      </div>
        
  );
}