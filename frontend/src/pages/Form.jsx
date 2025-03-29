import React, { useState } from 'react'

const Form = () => {

  const [name,setName]=useState("");
  const [quantity,setQuantity]=useState("");
  const [description,setDescription]=useState("");
  const [prize,setPrize]=useState("");


  const handelSubmit=async(e)=>{
    e.preventDefault();


  }


  return (

    <div className='h-screen flex justify-center items-center'>
    
    <form className=' flex flex-col gap-10 items-center justify-center text-white bg-[#899499] rounded-2xl px-15 py-12 ' onSubmit={()=>{handelSubmit}} >
        <div className='flex flex-col gap-2 w-xs'>
        <label htmlFor="name" className='text-xl'>Name</label>
        <div className='h-10 flex justify-center px-3 bg-gray-700 border-2 rounded-xl'>
        <input type="text" id='name' required value={name} onChange={(e)=>setName(e.target.value)}  className=' w-full' placeholder='Name of Crop...'/>
        </div>
        </div>
        <div className='flex flex-col gap-2 w-xs'>
        <label htmlFor="Quantity" className='text-xl'>Qunantity</label>
        <div className='h-10 flex justify-center px-3 bg-gray-700 border-2 rounded-xl'>
        <input type="text" id='Quantity' required  value={quantity} onChange={(e)=>setQuantity(e.target.value)} className=' w-full' placeholder='1 TON'/>
        </div>
        </div>
        <div className='flex flex-col gap-2 w-xs'>
        <label htmlFor="description" className='text-xl'>Description</label>
        <div className='h-10 flex justify-center px-3 bg-gray-700 border-2 rounded-xl'>
        <input type="text" id='description' required value={description} onChange={(e)=>setDescription(e.target.value)}  className=' w-full' placeholder='Add Description'/>
        </div>
        </div>
        <div className='flex flex-col gap-2 w-xs'>
        <label htmlFor="prize" className='text-xl'>Prize</label>
        <div className='h-10 flex justify-center px-3 bg-gray-700 border-2  rounded-xl'>
        <input type="number" id='prize' required value={prize} onChange={(e)=>setPrize(e.target.value)}  className=' w-full' placeholder='Add Prize'/>
        </div>
        </div>

        <p className='bg-gray-700 text-white px-8 py-3 rounded-2xl text-xl cursor-pointer'>UPLOAD</p>

    </form>
    
    </div>

    
  )
}

export default Form