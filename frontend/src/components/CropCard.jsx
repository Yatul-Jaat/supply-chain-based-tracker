import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { supplyChainAddress } from '../artifacts/address'; // Import the contract address
import contractABI from '../artifacts/FarmerSupplyChain.json'; // Import the ABI

const CropCard = ({ crop }) => {
  const [account, setAccount] = useState(null);
  const [currentStage, setCurrentStage] = useState('');
  const [error, setError] = useState('');
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractABI.abi, supplyChainAddress);

  useEffect(() => {
    // Fetch the current stage of the crop when the component mounts
    fetchCurrentStage(crop.id);
  }, [crop.id]);

  // Fetch the current stage of the crop
  const fetchCurrentStage = async (cropId) => {
    try {
      const stage = await contract.methods.showStage(cropId).call();
      setCurrentStage(stage);
    } catch (error) {
      console.error("Error fetching crop stage:", error);
      setError('Error fetching crop stage');
    }
  };

  // Function to change crop stage (based on role)
  const changeCropStage = async (newStage) => {
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setError('Please connect your wallet.');
        return;
      }
      setAccount(accounts[0]);

      let method;
      switch (newStage) {
        case 'Farming':
          method = contract.methods.farmingStage(crop.id);
          break;
        case 'Processing':
          method = contract.methods.processingStage(crop.id);
          break;
        case 'Distribution':
          method = contract.methods.distributionStage(crop.id);
          break;
        case 'Retail':
          method = contract.methods.retailStage(crop.id);
          break;
        default:
          setError('Invalid stage');
          return;
      }

      await method.send({ from: accounts[0] });
      alert(`${newStage} stage updated successfully!`);
      fetchCurrentStage(crop.id); // Refresh the current stage
    } catch (error) {
      console.error(error);
      setError('Error changing crop stage. Make sure the contract is deployed and connected.');
    }
  };

  return (
    <div className="crop-card border-2 rounded-xl p-4 my-4 flex flex-col gap-2 max-w-sm" >
      <h3><span className='font-semibold'>Crop: </span> {crop.name}</h3>
      <p><span className='font-semibold'>Description: </span>{crop.description}</p>
      <p><span className='font-semibold'>Quantity: </span>{crop.quantity}</p>
      <p><span className='font-semibold'>Price: </span>{web3.utils.fromWei(crop.price, 'ether')} ETH</p>
      <p><span className='font-semibold'>Current Stage: </span>{currentStage}</p>
      <div className='*:bg-gray-200 *:p-2 *:rounded-lg flex justify-center mt-4 *:hover:bg-gray-300 *:hover:cursor-pointer'> 
        
        {/* Buttons to move the crop to different stages */}
        {currentStage === 'Crop Initialized' && (
          <button onClick={() => changeCropStage('Farming')}>Move to Farming</button>
        )}
        {currentStage === 'Farming Stage' && (
          <button onClick={() => changeCropStage('Processing')}>Move to Processing</button>
        )}
        {currentStage === 'Processing Stage' && (
          <button onClick={() => changeCropStage('Distribution')}>Move to Distribution</button>
        )}
        {currentStage === 'Distribution Stage' && (
          <button onClick={() => changeCropStage('Retail')}>Move to Retail</button>
        )}
        {currentStage === 'Retail Stage' && (
          <button onClick={() => changeCropStage('Sold')}>Move to Sold</button>
        )}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CropCard;
