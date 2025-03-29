import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const AllDistributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch all distributors
  const fetchDistributors = async () => {
    try {
      // Get the total number of registered distributors
      const distributorCount = await contract.methods.distributorCtr().call();

      // Fetch each distributor's details
      const distributorsList = [];
      for (let i = 1; i <= distributorCount; i++) {
        const distributor = await contract.methods.Distributors(i).call(); // Fetch each distributor by ID
        distributorsList.push(distributor);
      }

      setDistributors(distributorsList);
    } catch (error) {
      console.error(error);
      setError('Error fetching distributors. Please make sure the contract is deployed and connected.');
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
    fetchDistributors();
  }, []);

  return (
    <div className='flex flex-col items-center gap-2 pt-5 px-30 mt-10'>
      <h2 className='bg-gray-200 px-4 py-3 rounded-xl font-semibold'>All Registered Distributors</h2>

      {/* Display the connected account */}
      {account && <p><strong>Connected Account:</strong> {account}</p>}

      {/* Display the list of distributors */}
      {distributors.length > 0 ? (
        <ul className='flex flex-wrap justify-start gap-5 border-2 rounded-xl px-4 py-2'>
          {distributors.map((distributor, index) => (
            <li key={index}>
              <strong>Distributor </strong>{distributor.id}<br />
              <strong>Name:</strong> {distributor.name}<br />
              <strong>Location:</strong> {distributor.location}
            </li>
          ))}
        </ul>
      ) : (
        <p className='font-semibold text-xl'>No distributors registered.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AllDistributors;
