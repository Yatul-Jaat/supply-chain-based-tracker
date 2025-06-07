import React from 'react'
import { NavLink } from 'react-router-dom'

const Rolechange = () => {
  return (
    <div className='h-full'> 
        <ul className="flex justify-center items-center flex-wrap gap-12 my-5 text-3xl font-semibold  *:text-white  *:rounded-lg *:cursor-pointer *:py-30">
          <NavLink
            className="flex flex-col gap-2 justify-center  w-xs items-center py-4 px-4 border-1 bg-[url(/farmer.png)] bg-cover bg-center backdrop-blur-sm backdrop:blur-2xl"
            to="/roles/farmer"
          >
            <p className=' px-4 py-2 rounded-xl uppercase backdrop-blur-2xl'>Farmer</p>
          </NavLink>
          <NavLink
            className="flex flex-col gap-2 justify-center w-xs items-center py-4 px-4 border-1 bg-[url(/processor.png)] bg-cover bg-center"
            to="/roles/processor"
          >
            <p className=' px-4 py-2 rounded-xl uppercase backdrop-blur-2xl'>Processor</p>
          </NavLink>
          <NavLink
            className="flex flex-col gap-2 justify-center w-xs items-center py-4 px-4 border-1 bg-[url(/distributor.png)] bg-cover bg-center"
            to="/roles/distributor"
          >
            <p cclassName=' px-4 py-2 rounded-xl uppercase backdrop-blur-2xl'>Distributor</p>
          </NavLink>
          <NavLink
            className="flex flex-col gap-2 justify-center w-xs items-center py-4 px-4 border-1 bg-[url(/retailer.png)] bg-cover bg-center"
            to="/roles/retailer"
          >
            <p className=' px-4 py-2 rounded-xl uppercase backdrop-blur-2xl'>Retailer</p>
          </NavLink>
        </ul>
    </div>
  )
}

export default Rolechange