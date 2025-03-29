import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {supplyChainAddress} from '../../artifacts/address'; // Assuming this file exports the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // The ABI should be an array inside the 'abi' key

const FarmerRegistration = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Web3 instance and contract initialization
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Importing the contract address
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Using ABI from contractABI

  // Handle registration of farmer
  const handleRegisterFarmer = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        setError('Please connect your wallet.');
        return;
      }
      setAccount(accounts[0]);

      // Call the registerFarmer method from the smart contract
      await contract.methods.registerFarmer(name, location, specialization).send({ from: accounts[0] });
      
      // If successful, clear the inputs and show a success message
      setName('');
      setLocation('');
      setSpecialization('');
      alert('Farmer registered successfully!');
    } catch (err) {
      console.error(err);
      setError('Error registering farmer. Make sure the contract is deployed and connected correctly.');
    }
  };

  // Handle account change
  useEffect(() => {
    const handleAccountChange = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    // Listen for account changes in the wallet
    window.ethereum.on('accountsChanged', handleAccountChange);

    // Cleanup the listener when the component unmounts
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChange);
    };
  }, []);

  return (
    <div className='flex flex-col items-center mt-5 gap-4 p-4'>
      <h2 className='text-2xl font-semibold'>Register as a Farmer</h2>
      
      {account && <p><strong>Connected Accounts:</strong> {account}</p>}
      
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
      <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm'>
        <input
        className='w-full'
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />
      </div>

      <button className='bg-black text-white px-4 text-xl rounded-xl mt-3 py-2' onClick={handleRegisterFarmer}>Register as Farmer</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FarmerRegistration;
