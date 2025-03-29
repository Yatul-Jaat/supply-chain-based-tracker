const FarmerSupplyChain = artifacts.require("FarmerSupplyChain");

module.exports = async function (deployer) {
  deployer.deploy(FarmerSupplyChain);
};