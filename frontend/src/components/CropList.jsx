import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { supplyChainAddress } from "../artifacts/address"; // Import the contract address
import contractABI from "../artifacts/FarmerSupplyChain.json"; // Import the ABI
import CropCard from "./CropCard";
import { li } from "motion/react-client";

const CropList = ({ farming, processing, retailing, distributor }) => {
  const [crops, setCrops] = useState([]);
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contractABI.abi, supplyChainAddress);

  useEffect(() => {
    // Fetch the list of crops (example: based on cropCtr)
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const cropCount = await contract.methods.cropCtr().call();
      const cropArray = [];

      for (let i = 1; i <= cropCount; i++) {
        const crop = await contract.methods.CropStock(i).call();
        cropArray.push(crop);
      }

      setCrops(cropArray);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4  px-20 py-4">
      <h2 className="text-xl font-semibold bg-gray-200 py-2 px-4 rounded-xl">
        Crop List
      </h2>
      <ul className="flex flex-wrap justify-start gap-5  w-full ">
        {crops.map((crop, index) => (
          <li key={index} >
            <CropCard key={crop.id} crop={crop} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CropList;
