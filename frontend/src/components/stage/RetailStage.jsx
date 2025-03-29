import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const RetailCrops = () => {
  const [crops, setCrops] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch crops in the "Retail" stage
  const fetchRetailCrops = async () => {
    try {
      // Get the total number of crops
      const cropCount = await contract.methods.cropCtr().call();

      // Fetch each crop's details and filter by "Retail" stage (stage 4)
      const cropsList = [];
      for (let i = 1; i <= cropCount; i++) {
        const crop = await contract.methods.CropStock(i).call(); // Fetch each crop by ID
        if (crop.stage === "4") { // "Retail" corresponds to stage 4
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
    fetchRetailCrops();
  }, []); // Only run once when the component mounts

  return (
    <div className='flex flex-col items-center gap-2 pt-5'>
      <h2 className='bg-gray-200 px-4 py-2 rounded-xl font-semibold'>Crops in Retail Stage</h2>

      {/* Display the connected account */}
      {account && <p><span className='font-semibold'>Connect Account: </span>{account}</p>}

      {/* Display the list of crops in the retail stage */}
      {crops.length > 0 ? (
        <ul className='flex flex-wrap justify-start w-full gap-5'>
          {crops.map((crop, index) => (
            <li key={index}>
              <strong>Crop ID:</strong> {crop.id}<br />
              <strong>Name:</strong> {crop.name}<br />
              <strong>Description:</strong> {crop.description}<br />
              <strong>Quantity:</strong> {crop.quantity}<br />
              <strong>Price:</strong> {web3.utils.fromWei(crop.price, 'ether')} ETH<br />
              <strong>Stage:</strong> Retail<br />
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-xl font-semibold'>No crops in the Retail stage.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RetailCrops;
