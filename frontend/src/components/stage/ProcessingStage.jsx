import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const ProcessingCrops = () => {
  const [crops, setCrops] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch crops in the "Processing" stage
  const fetchProcessingCrops = async () => {
    try {
      // Get the total number of crops
      const cropCount = await contract.methods.cropCtr().call();

      // Fetch each crop's details and filter by "Processing" stage (stage 2)
      const cropsList = [];
      for (let i = 1; i <= cropCount; i++) {
        const crop = await contract.methods.CropStock(i).call(); // Fetch each crop by ID
        if (crop.stage === "2") { // "Processing" corresponds to stage 2
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
    fetchProcessingCrops();
  }, []); // Only run once when the component mounts

  return (
    <div className='flex flex-col items-center gap-2 pt-5' >
      <h2 className='bg-gray-200 px-4 py-2 rounded-xl font-semibold'>Crops in Processing Stage</h2>

      {/* Display the connected account */}
      {account && <p><span className='font-semibold'>Connected Account: </span> {account}</p>}

      {/* Display the list of crops in the processing stage */}
      {crops.length > 0 ? (
        <ul className='flex flex-wrap justify-start w-full gap-5 px-30 '>
          {crops.map((crop, index) => (
            <li key={index} className='border-2 rounded-xl p-4 my-4 flex flex-col *"flex'>
              <strong><span className='font-semibold'>Crop Id: </span> {crop.id}</strong><br />
              <strong><span className='font-semibold'>Name: </span>{crop.name}</strong><br />
              <strong><span className='font-semibold'>Description: </span>{crop.description}</strong><br />
              <strong><span className='font-semibold'>Quality: </span>{crop.quantity}</strong><br />
              <strong><span className='font-semibold'>Prize: </span> {web3.utils.fromWei(crop.price, 'ether')} ETH</strong><br />
              <strong><span className='font-semibold'>Stage: </span> Processing</strong><br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No crops in the Processing stage.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProcessingCrops;
