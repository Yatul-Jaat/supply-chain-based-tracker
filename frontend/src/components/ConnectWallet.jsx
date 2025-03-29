import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MetaMaskConnection = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [networkId, setNetworkId] = useState(null);

  // Function to check MetaMask connection
  const checkMetaMaskConnection = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const networkId = await web3Instance.eth.net.getId();
        setNetworkId(networkId);

        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);

          const balance = await web3Instance.eth.getBalance(accounts[0]);
          setBalance(web3Instance.utils.fromWei(balance, 'ether'));
        }
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      console.log('MetaMask not found');
    }
  };

  // Function to switch to Ganache network
  const switchToGanacheNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x539', 
            chainName: 'Ganache',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['http://127.0.0.1:7545'],
          }]
        });
      } catch (error) {
        console.error('Failed to switch to Ganache network', error);
      }
    }
  };

  // Function to connect wallet manually
  const connectWallet = async () => {
    await checkMetaMaskConnection();
    await switchToGanacheNetwork();
  };

  // Listen for account changes and network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          // Refresh balance when account changes
          const fetchBalance = async () => {
            const newBalance = await web3.eth.getBalance(accounts[0]);
            setBalance(web3.utils.fromWei(newBalance, 'ether'));
          };
          fetchBalance();
        } else {
          setIsConnected(false);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    // Cleanup listener
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, [web3]); // Watch the `web3` variable for changes

  return (
    <div >
      
      {!isConnected ? (
        <button 
          onClick={connectWallet}
          className="bg-black text-white px-3 py-2 rounded-md cursor-pointer hover:bg-white hover:text-black duration-300 border-2"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="bg-black text-white px-3 py-2 rounded-md cursor-pointer hover:bg-white hover:text-black duration-300 border-2">
          <p className="mb-2"><strong>Connected Account</strong></p>
        </div>
      )}
    </div>
  );
};

export default MetaMaskConnection;
