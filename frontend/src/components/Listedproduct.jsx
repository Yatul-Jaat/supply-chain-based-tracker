import React, { useRef, useState } from 'react'
import { motion,useInView } from "motion/react"
import { div } from 'motion/react-client';
import Product from './Product';
import Navbar from './Navbar';
import DistributorState from './stage/DistributorStage';
import FarmingState from './stage/FarmingStage';
import ProcessingState from './stage/ProcessingStage';
import RetailState from './stage/RetailStage';
import CropList from './CropList';

const Listedproduct = () => {

  const [farming,setFarming]=useState(false )
  const [processing,setProcessing]=useState(false)
  const [retailing,setRetailing]=useState(false)
  const [distributor,setDistributor]=useState(false)

  return (
    <>
    <Navbar />
    <div className='flex items-center justify-center  gap-5 flex-wrap px-10 py-8 mt-4'>
      {/* <DistributorState />
      <FarmingState /> */}
      
      {/* <RetailState /> */}
      <ul className='flex gap-10 *:uppercase *:px-5 *:py-2 *:bg-gray-200 *:rounded-3xl *:cursor-pointer'>
        <li  onClick={()=>{setFarming(!farming); }} >Farming State</li>
        <li  onClick={()=>{setProcessing(!processing)}}>Processing State</li>
        <li  onClick={()=>{setRetailing(!retailing)}}>Reatiling State</li>
        <li  onClick={()=>{setDistributor(!distributor)}}>Distributing State</li>
      </ul>
    </div>
    {farming &&  <FarmingState />}
    {processing  && <ProcessingState />}
    {retailing &&   <RetailState />}
    {distributor &&  <DistributorState />}
    {!farming && !processing && !retailing && !distributor && <CropList />}
    
   </>
    
  )
}

export default Listedproduct