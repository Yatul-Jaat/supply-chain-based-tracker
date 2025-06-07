// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { supplyChainAddress } from '../../artifacts/address'; // Import the contract address
// import contractABI from '../../artifacts/FarmerSupplyChain.json'; // Import the ABI from the JSON file

// const RetailerRegistration = () => {
//   const [name, setName] = useState('');
//   const [location, setLocation] = useState('');
//   const [account, setAccount] = useState(null);
//   const [error, setError] = useState('');

//   // Initialize web3 and contract
//   const web3 = new Web3(window.ethereum);
//   const contractAddress = supplyChainAddress; // Contract address imported
//   const contract = new web3.eth.Contract(contractABI.abi, contractAddress); // Ensure ABI is imported correctly

//   // Register retailer function
//   const handleRegisterRetailer = async () => {
//     try {
//       // Get the accounts from MetaMask
//       const accounts = await web3.eth.getAccounts();
//       if (accounts.length === 0) {
//         setError('Please connect your wallet.');
//         return;
//       }

//       setAccount(accounts[0]);

//       // Call the registerRetailer method in the smart contract
//       await contract.methods.registerRetailer(name, location).send({ from: accounts[0] });

//       // Reset fields after successful registration
//       setName('');
//       setLocation('');
//       alert('Retailer registered successfully!');
//     } catch (error) {
//       console.error(error);
//       setError('Error registering retailer. Make sure the contract is deployed and connected.');
//     }
//   };

//   // Handle account change (if the user switches accounts in MetaMask)
//   useEffect(() => {
//     const handleAccountChange = (accounts) => {
//       if (accounts.length > 0) {
//         setAccount(accounts[0]);
//       } else {
//         setAccount(null);
//       }
//     };

//     // Listen for account changes in MetaMask
//     window.ethereum.on('accountsChanged', handleAccountChange);

//     // Cleanup listener on component unmount
//     return () => {
//       window.ethereum.removeListener('accountsChanged', handleAccountChange);
//     };
//   }, []);

//   return (
//     <div className='flex flex-col items-center mt-5 gap-4 p-4' >
//       <h2 className='text-2xl font-semibold'>Register as a Retailer</h2>

//       {/* Display the connected account */}
//       {account && <p><strong>Connected Account:</strong> {account}</p>}

//       {/* Input fields for retailer details */}
//       <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm' >
//         <input

//         className='w-full'
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>
//       <div className='bg-gray-200 px-4 h-10 flex rounded-xl w-sm' >
//         <input
//         className='w-full'
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </div>

//       {/* Register button */}
//       <button className='bg-black text-white px-4 text-xl py-2 rounded-xl mt-3' onClick={handleRegisterRetailer}>Register as Retailer</button>

//       {/* Display any error messages */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default RetailerRegistration;

import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { supplyChainAddress } from "../../artifacts/address";
import contractABI from "../../artifacts/FarmerSupplyChain.json";

const RetailerRegistration = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contractInstance = new web3Instance.eth.Contract(
        contractABI.abi,
        supplyChainAddress
      );
      setContract(contractInstance);

      // Fetch accounts
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      });
    } else {
      setError("Please install MetaMask.");
    }
  }, []);

  useEffect(() => {
    const handleAccountChange = (accounts) => {
      setAccount(accounts.length > 0 ? accounts[0] : null);
    };
    window.ethereum?.on("accountsChanged", handleAccountChange);
    return () =>
      window.ethereum?.removeListener("accountsChanged", handleAccountChange);
  }, []);

  const handleRegisterRetailer = async () => {
    if (!web3 || !contract) {
      setError("Web3 is not initialized properly.");
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setError("Please connect your wallet.");
        return;
      }
      setAccount(accounts[0]);
      await contract.methods
        .registerRetailer(name, location)
        .send({ from: accounts[0] });
      setName("");
      setLocation("");
      alert("Retailer registered successfully!");
    } catch (error) {
      console.error(error);
      setError(
        "Error registering retailer. Make sure the contract is deployed."
      );
    }
  };

  return (
    <div className="flex mt-30  justify-center flex-col items-center relative">
      <NavLink
        to="/roles"
        className="uppercase bg-black text-white px-4 py-2 rounded-2xl absolute top-0 left-0 mx-30 hover:cursor-pointer hidden lg:flex  justify-center items-center gap-2"
      >
        <FaArrowLeft className="text-sm" />
        <p>back</p>
      </NavLink>
      <h2 className="text-3xl font-semibold">Register as a Retailer</h2>
      <div className="flex flex-col items-center mt-5 gap-4 p-4">
        {account && (
          <p>
            <strong>Connected Account:</strong> {account}
          </p>
        )}
        <div className="bg-gray-200 px-4 h-10 flex rounded-xl w-64">
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="bg-gray-200 px-4 h-10 flex rounded-xl w-64">
          <input
            className="w-full bg-transparent outline-none"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          className="bg-black text-white px-4 text-xl py-2 hover:cursor-pointer rounded-xl mt-3"
          onClick={handleRegisterRetailer}
        >
          Register as Retailer
        </button>
      </div>
      {error && <p className="text-red-500 mt-10">{error}</p>}
    </div>
  );
};

export default RetailerRegistration;
