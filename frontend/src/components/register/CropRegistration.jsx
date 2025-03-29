import React, { useState } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const AddCrop = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Function to add crop to the blockchain
  const handleAddCrop = async () => {
    try {
      // Ensure all inputs are filled
      if (!name || !description || !quantity || !price) {
        setError('All fields are required.');
        return;
      }

      // Convert price from Ether to Wei
      const weiPrice = web3.utils.toWei(price, 'ether');  // Convert Ether to Wei

      // Get accounts from MetaMask
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setError('Please connect your wallet.');
        return;
      }

      setAccount(accounts[0]);

      // Call the addCrop method in the smart contract
      await contract.methods.addCrop(name, description, quantity, weiPrice).send({ from: accounts[0] });

      // Reset the input fields after successful registration
      setName('');
      setDescription('');
      setQuantity('');
      setPrice('');

      alert('Crop added successfully!');
    } catch (error) {
      console.error(error);
      setError('Error registering crop. Make sure the contract is deployed and connected.');
    }
  };

  return (
    <div className='flex flex-col items-center mt-5 gap-5 p-4' >
      <h2 className='text-2xl font-semibold'>Add a New Crop</h2>

      {/* Display the connected account */}
      {account && <p>Connected Account: {account}</p>}

      {/* Input fields for crop details */}
      <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm' >
        <input
        className='w-full'
          type="text"
          placeholder="Crop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm' >
        <input
        className='w-full'
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm' >
        <input
        className='w-full'
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm  ' >
        <input
          className='w-full'
          type="text"
          placeholder="Price (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Register button */}
      <button className='bg-black text-white px-4 text-xl py-2 rounded-xl mt-3 cursor-pointer' onClick={handleAddCrop}>Add Crop</button>

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddCrop;
