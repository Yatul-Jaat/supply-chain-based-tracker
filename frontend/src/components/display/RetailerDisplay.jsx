import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const AllRetailers = () => {
  const [retailers, setRetailers] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch all retailers
  const fetchRetailers = async () => {
    try {
      // Get the total number of registered retailers
      const retailerCount = await contract.methods.retailerCtr().call();

      // Fetch each retailer's details
      const retailersList = [];
      for (let i = 1; i <= retailerCount; i++) {
        const retailer = await contract.methods.Retailers(i).call(); // Fetch each retailer by ID
        retailersList.push(retailer);
      }

      setRetailers(retailersList);
    } catch (error) {
      console.error(error);
      setError('Error fetching retailers. Please make sure the contract is deployed and connected.');
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
    fetchRetailers();
  }, []);

  return (
    <div className='flex flex-col items-center gap-2 pt-5 px-30 mt-10'>
      <h2 className='bg-gray-200 px-4 py-2 rounded-xl font-semibold'>All Registered Retailers</h2>

      {/* Display the connected account */}
      {account && <p><strong>Connected Account:</strong> {account}</p>}

      {/* Display the list of retailers */}
      {retailers.length > 0 ? (
        <ul className='flex flex-wrap justify-start gap-5 border-2 rounded-xl px-4 py-2'>
          {retailers.map((retailer, index) => (
            <li key={index}>
              <strong>Retailer {retailer.id}</strong><br />
              <strong>Name:</strong> {retailer.name}<br />
              <strong>Location:</strong> {retailer.location}
            </li>
          ))}
        </ul>
      ) : (
        <p className='font-semibold text-xl'>No retailers registered.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AllRetailers;
