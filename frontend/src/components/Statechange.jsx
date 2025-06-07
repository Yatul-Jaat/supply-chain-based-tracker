import React from 'react'
import { NavLink } from 'react-router-dom'

const Statechange = () => {
  return (
    <div>
        <ul className="flex justify-center flex-wrap gap-12 my-5 text-2xl  *:rounded-lg *:cursor-pointer">
          <NavLink
            className="flex flex-col gap-2 justify-center items-center py-4 px-4 border-1"
            to="/listedproduct/farming"
          >
            <img className="rounded-lg" src="/farmer.png" alt="img" />
            <p>Farming State</p>
          </NavLink>
          <NavLink
            className="flex flex-col gap-2 justify-center items-center py-4 px-4 border-1"
            to="/listedproduct/processing"
          >
            <img className="rounded-lg" src="/processor.png" alt="img" />
            <p>Processing State</p>
          </NavLink>
          <NavLink
            className="flex flex-col gap-2 justify-center items-center py-4 px-4 border-1"
            to="/listedproduct/distributing"
          >
            <img className="rounded-lg" src="/distributor.png" alt="img" />
            <p>Distributing State</p>
          </NavLink>
          <NavLink
            className="flex flex-col gap-2 justify-center items-center py-4 px-4 border-1"
            to="/listedproduct/retailing"
          >
            <img className="rounded-lg" src="/retailer.png" alt="img" />
            <p>Retailing State</p>
          </NavLink>
        </ul>
    </div>
  )
}

export default Statechange