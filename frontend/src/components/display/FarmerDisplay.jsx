import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const AllFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch all farmers
  const fetchFarmers = async () => {
    try {
      // Get the total number of registered farmers
      const farmerCount = await contract.methods.farmerCtr().call();

      // Fetch each farmer's details
      const farmersList = [];
      for (let i = 1; i <= farmerCount; i++) {
        const farmer = await contract.methods.Farmers(i).call(); // Fetch each farmer by ID
        farmersList.push(farmer);
      }

      setFarmers(farmersList);
    } catch (error) {
      console.error(error);
      setError('Error fetching farmers. Please make sure the contract is deployed and connected.');
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
    fetchFarmers();
  }, []);

  return (
    <div className='flex flex-col items-center  gap-2 pt-5 px-30 mt-10' >
      <h2 className='bg-gray-200 px-4 py-2 rounded-xl font-semibold'>All Registered Farmers</h2>

      {/* Display the connected account */}
      {account && <p><strong>Connected Account:</strong> {account}</p>}

      {/* Display the list of farmers */}
      {farmers.length > 0 ? (
        <ul className='flex flex-wrap justify-start gap-5 border-2 rounded-xl px-4 py-2'>
          {farmers.map((farmer, index) => (
            <li key={index}>
              <strong>Farmer: </strong>{farmer.id}<br />
              <strong>Name:</strong> {farmer.name}<br />
              <strong>Location:</strong> {farmer.location}<br />
              <strong>Specialization:</strong> {farmer.specialization}
            </li>
          ))}
        </ul>
      ) : (
        <p className='font-semibold text-xl'>No farmers registered.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AllFarmers;
