import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const FarmingCrops = () => {
  const [crops, setCrops] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch crops in the "Farming" stage
  const fetchFarmingCrops = async () => {
    try {
      // Get the total number of crops
      const cropCount = await contract.methods.cropCtr().call();

      // Fetch each crop's details and filter by "Farming" stage (stage 1)
      const cropsList = [];
      for (let i = 1; i <= cropCount; i++) {
        const crop = await contract.methods.CropStock(i).call(); // Fetch each crop by ID
        if (crop.stage === "1") { // "Farming" corresponds to stage 1
          cropsList.push(crop);
        }
      }

      setCrops(cropsList);
    } catch (error) {
      console.error(error);
      setError('Error fetching crops. Please make sure the contract is deployed and connected.');
    }
  };

  // Get account when the component mounts
  useEffect(() => {
    const fetchAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };
    fetchAccount();
    fetchFarmingCrops();
  }, []); // Only run once when the component mounts

  return (
    // <div className='flex flex-col items-center gap-2 pt-5 '>
    //   <h2 className='bg-gray-200 px-4 py-2 rounded-xl font-semibold'>Crops in Farming Stage</h2>

    //   {/* Display the connected account */}
    //   {account && <p ><span className='font-semibold'>Connected Account: </span>{account}</p>}

    //   {/* Display the list of crops in the farming stage */}
    //   {crops.length > 0 ? (
    //     <ul className='flex flex-wrap justify-start w-full gap-5'>
    //       {crops.map((crop, index) => (
    //         <li key={index} className='border-2 rounded-xl p-4 my-4 flex flex-col gap-2 px-30 '>
    //           <strong><span className='font-semibold'>Connected Account: </span></strong> {crop.id}<br />
    //           <strong><span className='font-semibold'>Name: </span></strong> {crop.name}<br />
    //           <strong><span className='font-semibold'>Connected Account: </span></strong> {crop.description}<br />
    //           <strong><span className='font-semibold'>Quantity: </span></strong> {crop.quantity}<br />
    //           <strong><span className='font-semibold'>Prize: </span></strong> {web3.utils.fromWei(crop.price, 'ether')} ETH<br />
    //           <strong><span className='font-semibold'>Stage: </span></strong> Farming<br />
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p className='text-xl font-semibold'>No crops in the Farming stage.</p>
    //   )}

    //   {/* Display any error messages */}
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    // </div>

    <div className='flex flex-col px-20 mt-8 pt-2  gap-10 relative'>
      <NavLink to="/listedproduct" className='hidden lg:flex uppercase bg-black text-white px-4 py-2 rounded-2xl absolute top-0 left-0 mx-30 hover:cursor-pointer  justify-center items-center gap-2'>
            <FaArrowLeft className='text-sm' />
              <p>back</p>
            </NavLink>
      <div className=' px-4 py-2 rounded-xl text-3xl uppercase font-semibold text-center'>Crops in Farming Stage</div>
      {crops.length>0?(
      <div className=' flex gap-5 pt-5 px-4 flex-wrap'>
      {crops.map((crop,index)=>(
        <ul key={index} className='flex flex-col justify-center  items-start gap-2 border-1 px-4 py-2 text-wrap w-xs rounded-lg' >
        <li><span className='text-xl font-semibold'>Connected Account: </span>{crop.id}</li>
        <li><span className='text-xl font-semibold'>Name: </span>{crop.name}</li>
        <li><span className='text-xl font-semibold'>Quality: </span>{crop.quantity}</li>
        <li><span className='text-xl font-semibold'>Prize: </span>{web3.utils.fromWei(crop.price, 'ether')} ETH</li>
        <li><span className='text-xl font-semibold'>Stage: </span>Farming</li>
      </ul>
      ))}</div>):(
        <p className='text-2xl font-semibold text-center'>No crops in the Farming stage.</p>
      )}
      
      {error && <p className='text-red-500 text-center text-xl'>{error}</p>}
    </div>
  );
};

export default FarmingCrops;



{/* <div className='flex flex-col px-20 py-8'>
      <div className='bg-gray-200 px-4 py-2 rounded-xl text-3xl uppercase font-semibold text-center'>Crops in Farming Stage</div>
      <div className=' flex gap-5 pt-5 px-4 flex-wrap'>
      <ul className='flex flex-col justify-center  items-start gap-2 border-1 px-4 py-2 text-wrap w-xs rounded-lg' >
        <li><span className='text-xl font-semibold'>Connected Account:</span> asdfggh</li>
        <li><span className='text-xl font-semibold'>Name:</span> yatul</li>
        <li><span className='text-xl font-semibold'>Quality:</span> 123</li>
        <li><span className='text-xl font-semibold'>Prize:</span> 123</li>
        <li><span className='text-xl font-semibold'>Stage:</span> farming</li>
      </ul>
      </div>
    </div> */}