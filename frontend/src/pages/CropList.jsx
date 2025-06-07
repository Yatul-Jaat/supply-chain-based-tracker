import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { supplyChainAddress } from "../artifacts/address"; // Import the contract address
import contractABI from "../artifacts/FarmerSupplyChain.json"; // Import the ABI
import CropCard from "../components/CropCard";
import { li } from "motion/react-client";

const CropList = ({setNavColor}) => {
  setNavColor("crops")

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
      {crops.length>0?(
        <div className=' flex gap-5 pt-5 px-4 flex-wrap'>
        {crops.map((crop, index) => (
          <ul key={index} className='flex flex-col justify-center  items-start gap-2 border-1 px-4 py-2 text-wrap w-xs rounded-lg' >
            <CropCard key={crop.id} crop={crop} />
          </ul>
        ))}
      </div>
      ):(
        <p className='text-2xl text-center'>No crop listed.</p>
      )}
    </div>
  );
};

export default CropList;
