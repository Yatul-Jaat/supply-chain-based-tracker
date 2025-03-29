// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;

contract FarmerSupplyChain {
    // Contract owner (the deployer of the contract)
    address public Owner;

    // Constructor to set the contract owner
    constructor() public {
        Owner = msg.sender;
    }

    // Modifier to restrict functions to only the owner
    modifier onlyByOwner() {
        require(msg.sender == Owner, "Only contract owner can perform this action");
        _;
    }

    // Stages of agricultural product
    enum STAGE {
        Init,
        Farming,
        Processing,
        Distribution,
        Retail,
        Sold
    }

    // Counters for tracking entities
    uint256 public cropCtr = 0;
    uint256 public farmerCtr = 0;
    uint256 public processorCtr = 0;
    uint256 public distributorCtr = 0;
    uint256 public retailerCtr = 0;

    // Struct to store crop information
    struct Crop {
        uint256 id;
        string name;
        string description;
        uint256 farmerId;
        uint256 processorId;
        uint256 distributorId;
        uint256 retailerId;
        uint256 quantity;
        uint256 price;
        STAGE stage;
    }

    // Struct to store farmer information
    struct Farmer {
        address addr;
        uint256 id;
        string name;
        string location;
        string specialization;
    }

    // Struct to store processor information
    struct Processor {
        address addr;
        uint256 id;
        string name;
        string location;
    }

    // Struct to store distributor information
    struct Distributor {
        address addr;
        uint256 id;
        string name;
        string location;
    }

    // Struct to store retailer information
    struct Retailer {
        address addr;
        uint256 id;
        string name;
        string location;
    }

    // Mappings to store and manage entities
    mapping(uint256 => Crop) public CropStock;
    mapping(uint256 => Farmer) public Farmers;
    mapping(uint256 => Processor) public Processors;
    mapping(uint256 => Distributor) public Distributors;
    mapping(uint256 => Retailer) public Retailers;

    // Mappings to check registration
    mapping(address => uint256) public RegisteredFarmers;
    mapping(address => uint256) public RegisteredProcessors;
    mapping(address => uint256) public RegisteredDistributors;
    mapping(address => uint256) public RegisteredRetailers;

    // Events for tracking important actions
    event FarmerRegistered(address indexed farmer, uint256 id);
    event ProcessorRegistered(address indexed processor, uint256 id);
    event DistributorRegistered(address indexed distributor, uint256 id);
    event RetailerRegistered(address indexed retailer, uint256 id);
    event CropAdded(uint256 cropId, string name, uint256 quantity, uint256 price);
    event CropStageUpdated(uint256 cropId, STAGE newStage);

    // Function to register a farmer
    function registerFarmer(
        string memory _name,
        string memory _location,
        string memory _specialization
    ) public {
        require(RegisteredFarmers[msg.sender] == 0, "Already registered as a farmer");

        farmerCtr++;
        Farmers[farmerCtr] = Farmer(
            msg.sender,
            farmerCtr,
            _name,
            _location,
            _specialization
        );
        RegisteredFarmers[msg.sender] = farmerCtr;

        emit FarmerRegistered(msg.sender, farmerCtr);
    }

    // Function to register a processor
    function registerProcessor(
        string memory _name,
        string memory _location
    ) public {
        require(RegisteredProcessors[msg.sender] == 0, "Already registered as a processor");

        processorCtr++;
        Processors[processorCtr] = Processor(
            msg.sender,
            processorCtr,
            _name,
            _location
        );
        RegisteredProcessors[msg.sender] = processorCtr;

        emit ProcessorRegistered(msg.sender, processorCtr);
    }

    // Function to register a distributor
    function registerDistributor(
        string memory _name,
        string memory _location
    ) public {
        require(RegisteredDistributors[msg.sender] == 0, "Already registered as a distributor");

        distributorCtr++;
        Distributors[distributorCtr] = Distributor(
            msg.sender,
            distributorCtr,
            _name,
            _location
        );
        RegisteredDistributors[msg.sender] = distributorCtr;

        emit DistributorRegistered(msg.sender, distributorCtr);
    }

    // Function to register a retailer
    function registerRetailer(
        string memory _name,
        string memory _location
    ) public {
        require(RegisteredRetailers[msg.sender] == 0, "Already registered as a retailer");

        retailerCtr++;
        Retailers[retailerCtr] = Retailer(
            msg.sender,
            retailerCtr,
            _name,
            _location
        );
        RegisteredRetailers[msg.sender] = retailerCtr;

        emit RetailerRegistered(msg.sender, retailerCtr);
    }

    // Function to add a new crop (only by owner)
    function addCrop(
        string memory _name,
        string memory _description,
        uint256 _quantity,
        uint256 _price
    ) public onlyByOwner {
        require(farmerCtr > 0, "No farmers registered yet");

        cropCtr++;
        CropStock[cropCtr] = Crop(
            cropCtr,
            _name,
            _description,
            0,  // No farmer assigned yet
            0,  // No processor assigned yet
            0,  // No distributor assigned yet
            0,  // No retailer assigned yet
            _quantity,
            _price,
            STAGE.Init
        );

        emit CropAdded(cropCtr, _name, _quantity, _price);
    }

    // Function to update crop stage (farming)
    function farmingStage(uint256 _cropId) public {
        uint256 _farmerId = RegisteredFarmers[msg.sender];
        require(_farmerId > 0, "Not registered as a farmer");
        require(CropStock[_cropId].stage == STAGE.Init, "Crop not in initial stage");

        CropStock[_cropId].farmerId = _farmerId;
        CropStock[_cropId].stage = STAGE.Farming;

        emit CropStageUpdated(_cropId, STAGE.Farming);
    }

    // Function to update crop stage (processing)
    function processingStage(uint256 _cropId) public {
        uint256 _processorId = RegisteredProcessors[msg.sender];
        require(_processorId > 0, "Not registered as a processor");
        require(CropStock[_cropId].stage == STAGE.Farming, "Crop not in farming stage");

        CropStock[_cropId].processorId = _processorId;
        CropStock[_cropId].stage = STAGE.Processing;

        emit CropStageUpdated(_cropId, STAGE.Processing);
    }

    // Function to update crop stage (distribution)
    function distributionStage(uint256 _cropId) public {
        uint256 _distributorId = RegisteredDistributors[msg.sender];
        require(_distributorId > 0, "Not registered as a distributor");
        require(CropStock[_cropId].stage == STAGE.Processing, "Crop not in processing stage");

        CropStock[_cropId].distributorId = _distributorId;
        CropStock[_cropId].stage = STAGE.Distribution;

        emit CropStageUpdated(_cropId, STAGE.Distribution);
    }

    // Function to update crop stage (retail)
    function retailStage(uint256 _cropId) public {
        uint256 _retailerId = RegisteredRetailers[msg.sender];
        require(_retailerId > 0, "Not registered as a retailer");
        require(CropStock[_cropId].stage == STAGE.Distribution, "Crop not in distribution stage");

        CropStock[_cropId].retailerId = _retailerId;
        CropStock[_cropId].stage = STAGE.Retail;

        emit CropStageUpdated(_cropId, STAGE.Retail);
    }

    // Function to show current stage of a crop
    function showStage(uint256 _cropId) public view returns (string memory) {
        require(cropCtr > 0, "No crops exist");

        STAGE currentStage = CropStock[_cropId].stage;

        if (currentStage == STAGE.Init) return "Crop Initialized";
        if (currentStage == STAGE.Farming) return "Farming Stage";
        if (currentStage == STAGE.Processing) return "Processing Stage";
        if (currentStage == STAGE.Distribution) return "Distribution Stage";
        if (currentStage == STAGE.Retail) return "Retail Stage";
        if (currentStage == STAGE.Sold) return "Crop Sold";

        return "Unknown Stage";
    }

    // Function to get product history (Farmer, Processor, Distributor, Retailer)
    function getProductHistory(uint256 _cropId)
        public
        view
        returns (
            string memory farmerName,
            string memory farmerLocation,
            string memory processorName,
            string memory processorLocation,
            string memory distributorName,
            string memory distributorLocation,
            string memory retailerName,
            string memory retailerLocation
        )
    {
        require(_cropId > 0 && _cropId <= cropCtr, "Invalid crop ID");

        Crop memory crop = CropStock[_cropId];
        Farmer memory farmer = Farmers[crop.farmerId];
        Processor memory processor = Processors[crop.processorId];
        Distributor memory distributor = Distributors[crop.distributorId];
        Retailer memory retailer = Retailers[crop.retailerId];

        return (
            farmer.name, farmer.location,
            processor.name, processor.location,
            distributor.name, distributor.location,
            retailer.name, retailer.location
        );
    }
}
