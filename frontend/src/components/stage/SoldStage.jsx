import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

const SoldCrops = () => {
  const [crops, setCrops] = useState([]);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  // Initialize web3 and contract
  const web3 = new Web3(window.ethereum);
  const contractAddress = supplyChainAddress; // Contract address imported
  const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

  // Fetch crops in the "Sold" stage
  const fetchSoldCrops = async () => {
    try {
      // Get the total number of crops
      const cropCount = await contract.methods.cropCtr().call();

      // Fetch each crop's details and filter by "Sold" stage (stage 7)
      const cropsList = [];
      for (let i = 1; i <= cropCount; i++) {
        const crop = await contract.methods.CropStock(i).call(); // Fetch each crop by ID
        if (crop.stage === "7") { // "Sold" corresponds to stage 7
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
    fetchSoldCrops();
  }, []); // Only run once when the component mounts

  return (
    <div>
      <h2>Crops in Sold Stage</h2>

      {/* Display the connected account */}
      {account && <p>Connected Account: {account}</p>}

      {/* Display the list of crops in the sold stage */}
      {crops.length > 0 ? (
        <ul>
          {crops.map((crop, index) => (
            <li key={index}>
              <strong>Crop ID:</strong> {crop.id}<br />
              <strong>Name:</strong> {crop.name}<br />
              <strong>Description:</strong> {crop.description}<br />
              <strong>Quantity:</strong> {crop.quantity}<br />
              <strong>Price:</strong> {web3.utils.fromWei(crop.price, 'ether')} ETH<br />
              <strong>Stage:</strong> Sold<br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No crops in the Sold stage.</p>
      )}

      {/* Display any error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SoldCrops;
