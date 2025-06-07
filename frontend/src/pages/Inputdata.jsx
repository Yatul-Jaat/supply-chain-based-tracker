import React from 'react'
import CropRegisteration from '../components/register/CropRegistration'
import Navbar from '../components/Navbar'

const Inputdata = ({setNavColor}) => {
  setNavColor("form")
  return (
    <div>
      <CropRegisteration /> 
    </div>
  )
}

export default Inputdata