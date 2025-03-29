// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AgriculturalSupplyChain {
    address public Owner;

    constructor() public {
        Owner = msg.sender;
    }

    enum STAGE {
        Init,
        Farming,
        Processing,
        Distribution,
        Retail,
        Sold
    }

    uint256 public productCtr = 0;
    uint256 public farmerCtr = 0;
    uint256 public processorCtr = 0;
    uint256 public distributorCtr = 0;
    uint256 public retailerCtr = 0;

    struct Product {
        uint256 id;
        string name;
        uint256 cost;
        uint256 quantity;
        string addressPincode;
        uint256 farmerId;
        uint256 processorId;
        uint256 distributorId;
        uint256 retailerId;
        STAGE stage;
    }

    struct Farmer {
        address addr;
        uint256 id;
        string name;
        string location;
    }

    struct Processor {
        address addr;
        uint256 id;
        string name;
        string location;
    }

    struct Distributor {
        address addr;
        uint256 id;
        string name;
        string location;
    }

    struct Retailer {
        address addr;
        uint256 id;
        string name;
        string location;
    }

    mapping(uint256 => Product) public ProductStock;
    mapping(address => uint256) public RegisteredFarmers;
    mapping(address => uint256) public RegisteredProcessors;
    mapping(address => uint256) public RegisteredDistributors;
    mapping(address => uint256) public RegisteredRetailers;

    mapping(uint256 => Farmer) public Farmers;
    mapping(uint256 => Processor) public Processors;
    mapping(uint256 => Distributor) public Distributors;
    mapping(uint256 => Retailer) public Retailers;

    event FarmerRegistered(address indexed farmer, uint256 id);
    event ProcessorRegistered(address indexed processor, uint256 id);
    event DistributorRegistered(address indexed distributor, uint256 id);
    event RetailerRegistered(address indexed retailer, uint256 id);
    event ProductAdded(uint256 productId, string name, uint256 cost, uint256 quantity);
    
    // Register as a Farmer
    function registerAsFarmer(string memory _name, string memory _location) public {
        require(RegisteredFarmers[msg.sender] == 0, "Already registered as a farmer");
        farmerCtr++;
        Farmers[farmerCtr] = Farmer(msg.sender, farmerCtr, _name, _location);
        RegisteredFarmers[msg.sender] = farmerCtr;
        emit FarmerRegistered(msg.sender, farmerCtr);
    }

    // Register as a Processor
    function registerAsProcessor(string memory _name, string memory _location) public {
        require(RegisteredProcessors[msg.sender] == 0, "Already registered as a processor");
        processorCtr++;
        Processors[processorCtr] = Processor(msg.sender, processorCtr, _name, _location);
        RegisteredProcessors[msg.sender] = processorCtr;
        emit ProcessorRegistered(msg.sender, processorCtr);
    }

    // Register as a Distributor
    function registerAsDistributor(string memory _name, string memory _location) public {
        require(RegisteredDistributors[msg.sender] == 0, "Already registered as a distributor");
        distributorCtr++;
        Distributors[distributorCtr] = Distributor(msg.sender, distributorCtr, _name, _location);
        RegisteredDistributors[msg.sender] = distributorCtr;
        emit DistributorRegistered(msg.sender, distributorCtr);
    }

    // Register as a Retailer
    function registerAsRetailer(string memory _name, string memory _location) public {
        require(RegisteredRetailers[msg.sender] == 0, "Already registered as a retailer");
        retailerCtr++;
        Retailers[retailerCtr] = Retailer(msg.sender, retailerCtr, _name, _location);
        RegisteredRetailers[msg.sender] = retailerCtr;
        emit RetailerRegistered(msg.sender, retailerCtr);
    }

    // Function to add a new product (Only owner can add)
    function addProduct(
        string memory _name,
        uint256 _cost,
        uint256 _quantity,
        string memory _addressPincode
    ) public {
        productCtr++;
        ProductStock[productCtr] = Product(
            productCtr,
            _name,
            _cost,
            _quantity,
            _addressPincode,
            0, // No assigned farmer yet
            0, // No assigned processor yet
            0, // No assigned distributor yet
            0, // No assigned retailer yet
            STAGE.Init
        );
        emit ProductAdded(productCtr, _name, _cost, _quantity);
    }

    function farmingStage(uint256 _productId) public {
        uint256 _farmerId = RegisteredFarmers[msg.sender];
        require(_farmerId > 0, "Not registered as a farmer");
        require(ProductStock[_productId].stage == STAGE.Init, "Product not in initial stage");
        
        ProductStock[_productId].farmerId = _farmerId;
        ProductStock[_productId].stage = STAGE.Farming;
    }

    function processingStage(uint256 _productId) public {
        uint256 _processorId = RegisteredProcessors[msg.sender];
        require(_processorId > 0, "Not registered as a processor");
        require(ProductStock[_productId].stage == STAGE.Farming, "Product not in farming stage");
        
        ProductStock[_productId].processorId = _processorId;
        ProductStock[_productId].stage = STAGE.Processing;
    }

    function distributionStage(uint256 _productId) public {
        uint256 _distributorId = RegisteredDistributors[msg.sender];
        require(_distributorId > 0, "Not registered as a distributor");
        require(ProductStock[_productId].stage == STAGE.Processing, "Product not in processing stage");
        
        ProductStock[_productId].distributorId = _distributorId;
        ProductStock[_productId].stage = STAGE.Distribution;
    }

    function retailStage(uint256 _productId) public {
        uint256 _retailerId = RegisteredRetailers[msg.sender];
        require(_retailerId > 0, "Not registered as a retailer");
        require(ProductStock[_productId].stage == STAGE.Distribution, "Product not in distribution stage");
        
        ProductStock[_productId].retailerId = _retailerId;
        ProductStock[_productId].stage = STAGE.Retail;
    }

    function soldStage(uint256 _productId) public {
        uint256 _retailerId = RegisteredRetailers[msg.sender];
        require(_retailerId > 0, "Not registered as a retailer");
        require(ProductStock[_productId].stage == STAGE.Retail, "Product not in retail stage");
        
        ProductStock[_productId].stage = STAGE.Sold;
    }

    function getProductHistory(uint256 _productId)
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
        require(_productId > 0 && _productId <= productCtr, "Invalid product ID");

        Product memory product = ProductStock[_productId];
        Farmer memory farmer = Farmers[product.farmerId];
        Processor memory processor = Processors[product.processorId];
        Distributor memory distributor = Distributors[product.distributorId];
        Retailer memory retailer = Retailers[product.retailerId];

        return (
            farmer.name, farmer.location,
            processor.name, processor.location,
            distributor.name, distributor.location,
            retailer.name, retailer.location
        );
    }
}
