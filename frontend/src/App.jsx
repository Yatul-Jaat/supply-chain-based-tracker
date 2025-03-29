import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ConnectWallet from './components/ConnectWallet'
import FarmerRegistration from './components/register/FarmerRegistration'
import DistributorRegistration from './components/register/DistributorRegistration'
import ProcessorRegistration from './components/register/ProcessorRegistered'
import RetailerRegistration from './components/register/RetailerRegistered'
import CropRegistration from './components/register/CropRegistration'
import AllFarmers from './components/display/FarmerDisplay'
import AllDistributors from './components/display/DistributorDisplay'
import AllProcessors from './components/display/ProcessorDisplay'
import AllRetailers from './components/display/RetailerDisplay'
import AllCrops from './components/display/CropDisplay'
import CropsInInitStage from './components/stage/InitStage'
import FarmingCrops from './components/stage/FarmingStage'
import ProcessingCrops from './components/stage/ProcessingStage'
import DistributionCrops from './components/stage/DistributorStage'
import SoldCrops from './components/stage/SoldStage'
import RetailCrops from './components/stage/RetailStage'
import CropCard from './components/CropCard'
import CropList from './components/CropList'

import {Route, BrowserRouter as Router,  Routes} from 'react-router-dom'

import Home from './pages/Home'
import Listedproduct from './components/Listedproduct'
import Roles from './pages/Roles'
import Inputdata from './pages/Inputdata'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listedproduct" element={<Listedproduct />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/form" element={<Inputdata />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
