import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {supplyChainAddress} from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const DistributorRegistration = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Register distributor function
  const handleRegisterDistributor = async () => {
    try {
      // Get the accounts from MetaMask
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setError('Please connect your wallet.');
        return;
      }

      setAccount(accounts[0]);

      // Call the registerDistributor method in the smart contract
      await contract.methods.registerDistributor(name, location).send({ from: accounts[0] });

      // Reset fields after successful registration
      setName('');
      setLocation('');
      alert('Distributor registered successfully!');
    } catch (error) {
      console.error(error);
      setError('Error registering distributor. Make sure the contract is deployed and connected.');
    }
  };

  // Handle account change (if the user switches accounts in MetaMask)
  useEffect(() => {
    const handleAccountChange = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    // Listen for account changes in MetaMask
    window.ethereum.on('accountsChanged', handleAccountChange);

    // Cleanup listener on component unmount
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChange);
    };
  }, []);

  return (
    <div className='flex flex-col items-center mt-5 gap-4 py-4 px-4'>
      <h2 className='text-2xl font-semibold'>Register as a Distributor</h2>
      
      {/* Display the connected account */}
      {account && <p><span className='font=semibold'>Connected Accout:</span> {account}</p>}

      {/* Input fields for distributor details */}
      <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm'>
        <input
        className='w-full'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm'>
        <input
        className='w-full'
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Register button */}
      <button className='bg-black text-white px-4 text-xl rounded-xl mt-3 py-2' onClick={handleRegisterDistributor}>Register as Distributor</button>

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default DistributorRegistration;
