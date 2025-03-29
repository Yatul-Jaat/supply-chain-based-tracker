import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const AllProcessors = () => {
  const [processors, setProcessors] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch all processors
  const fetchProcessors = async () => {
    try {
      // Get the total number of registered processors
      const processorCount = await contract.methods.processorCtr().call();

      // Fetch each processor's details
      const processorsList = [];
      for (let i = 1; i <= processorCount; i++) {
        const processor = await contract.methods.Processors(i).call(); // Fetch each processor by ID
        processorsList.push(processor);
      }

      setProcessors(processorsList);
    } catch (error) {
      console.error(error);
      setError('Error fetching processors. Please make sure the contract is deployed and connected.');
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
    fetchProcessors();
  }, []);

  return (
    <div className='flex flex-col items-center gap-2 pt-5 px-30 mt-10'>
      <h2 className='bg-gray-200 px-4 py-2 rounded-xl font-semibold'>All Registered Processors</h2>

      {/* Display the connected account */}
      {account && <p><strong>Connected Account:</strong> {account}</p>}

      {/* Display the list of processors */}
      {processors.length > 0 ? (
        <ul className='flex flex-wrap justify-start gap-5 border-2 rounded-xl px-4 py-2'>
          {processors.map((processor, index) => (
            <li key={index}>
              <strong>Processor {processor.id}</strong><br />
              <strong>Name:</strong> {processor.name}<br />
              <strong>Location:</strong> {processor.location}
            </li>
          ))}
        </ul>
      ) : (
        <p className='font-semibold text-xl'>No processors registered.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AllProcessors;
