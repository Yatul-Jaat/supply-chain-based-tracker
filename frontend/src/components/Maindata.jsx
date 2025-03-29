import React from 'react'

const  Maindata = () => {
  return (
    <div className='text-black flex flex-col justify-center items-center mb-10'>
        <div className='flex flex-col-reverse lg:flex-row justify-center items-center gap-5 px-30 mt-4 '>
            <div className='flex flex-col gap-10 items-start '>
            <p id='line-height-p' className='text-5xl font-semibold  text-wrap max-w-xl px-2 py-4 '>Empowering Farmers, Connecting Markets, Ensuring Transparency</p>
            <p className='bg-black border-2 hover:text-black hover:bg-white duration-300 text-white px-5 text-lg rounded-3xl uppercase cursor-pointer py-1'>Explore</p>
            </div>
            <img src="/public/msn.jpg" alt="img" />
        </div>
        <div className='flex gap-10 -translate-x-7/12 '>
            <div className='flex flex-col justify-center items-center border-r-2 border-b-white pr-5 '>
                <p className='text-5xl'>12k+</p>
                <p className='text-xl'>listings</p>
            </div>
            <div className='flex flex-col justify-center items-center border-r-2 border-b-white pr-5 '>
                <p className='text-5xl'>25k+</p>
                <p className='text-xl'>Farmers</p>
            </div>
            <div className='flex flex-col justify-center items-center  '>
                <p className='text-5xl'>50k+</p>
                <p className='text-xl'>Users</p>
            </div>
        </div>
    </div>
  )
}

export default Maindata