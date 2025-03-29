import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

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
    <div className='flex flex-col items-center gap-2 pt-5 '>
      <h2 className='bg-gray-200 px-4 py-2 rounded-xl font-semibold'>Crops in Farming Stage</h2>

      {/* Display the connected account */}
      {account && <p ><span className='font-semibold'>Connected Account: </span>{account}</p>}

      {/* Display the list of crops in the farming stage */}
      {crops.length > 0 ? (
        <ul className='flex flex-wrap justify-start w-full gap-5'>
          {crops.map((crop, index) => (
            <li key={index} className='border-2 rounded-xl p-4 my-4 flex flex-col gap-2 px-30 '>
              <strong><span className='font-semibold'>Connected Account: </span></strong> {crop.id}<br />
              <strong><span className='font-semibold'>Name: </span></strong> {crop.name}<br />
              <strong><span className='font-semibold'>Connected Account: </span></strong> {crop.description}<br />
              <strong><span className='font-semibold'>Quantity: </span></strong> {crop.quantity}<br />
              <strong><span className='font-semibold'>Prize: </span></strong> {web3.utils.fromWei(crop.price, 'ether')} ETH<br />
              <strong><span className='font-semibold'>Stage: </span></strong> Farming<br />
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-xl font-semibold'>No crops in the Farming stage.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FarmingCrops;
