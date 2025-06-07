import { NavLink, Outlet } from 'react-router-dom';

const Listedproduct = ({setNavColor}) => {

  setNavColor("listedproduct")

  return (
    <>
    <Outlet />
   </>
    
  )
}

export default Listedproduct