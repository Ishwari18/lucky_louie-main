import { BiChevronDown } from "react-icons/bi";
import { React, useState, useEffect } from "react";
import networks from "./networks.jsx";
const { ethers, BigNumber } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(networks.sepolia.rpcUrl);

const styles = {
  stake: "w-full p-9 rounded-3xl relative",
  h1: "text-[1.8em]",
  total: "ttext-[0.6em] absolute top-5 right-7",
  desc: "text-[1.2em] mt-2",
  pill: "bg-[#1F1F1F] w-[100%] md:width-[initial] border border-white text-white text-center rounded-full px-5 py-2 text-[1.1em]",
  pills:
    "flex md:flex-row flex-col flex-wrap md:flex-nowrap justify-center items-center gap-7 md:gap-16 mt-10",
};

const stakingcontractAddress = "0x9fA865CF5a1f341c0f9a9d6bBd9A74888C1Bccd2";
const tokenContractAddress = "0x55e9053F60b31F5738f9c54CaDF85D01245BE3Fc";
const stakingcontractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_minimumDurationInDays",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_batman",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "JackpotWon",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Received",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Unstaked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "activateRaffle",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "batman",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getJackpotBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStakerAddresses",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastActivationTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minimumDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokensStaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
const tokenContractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default function Stake() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [hasStaked, setHasStaked] = useState(false);
  const [isUnstakeEnabled, setUnstakeEnabled] = useState(false);
  const [totalTokensStaked, setTotalTokensStaked] = useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  // Retrieve the connected address
  const getConnectedAddress = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      return accounts[0];
    } catch (error) {
      console.error("Failed to connect:", error);
      return null;
    }
  };

  useEffect(() => {
		const checkStakedStatus = async () => {
			try {
				const contract = new ethers.Contract(
					stakingcontractAddress,
					stakingcontractABI,
					signer
				  );
			  const connectedAddress = await signer.getAddress();
			  const staker = await contract.stakers(connectedAddress);
		
			  const hasStaked = staker.timestamp > 0;
			  setHasStaked(hasStaked);
			} catch (error) {
			  console.error("Error checking staked status:", error);
			}
		  };

      // Fetch the total tokens staked
    const fetchTotalTokensStaked = async () => {
      try {
        const contract = new ethers.Contract(
					stakingcontractAddress,
					stakingcontractABI,
					signer
				  );
        const totalStaked = await contract.totalTokensStaked();
        setTotalTokensStaked(totalStaked.toString());
      } catch (error) {
        console.error('Error fetching total tokens staked:', error);
      }
    };

    fetchTotalTokensStaked();
		  checkStakedStatus();
  }, []);
  
  const handleInputChange = (event) => {
    setStakeAmount(event.target.value);
  };

  const approve = async (amount) => {
    try {
      const tokenContract = new ethers.Contract(
        tokenContractAddress,
        tokenContractABI,
        signer
      );
      const allowance = await tokenContract.allowance(
        signer.getAddress(),
        stakingcontractAddress
      );

      // Check if the allowance is sufficient, if not, approve the staking contract
      if (allowance.lt(amount)) {
        const approveTx = await tokenContract.approve(
          stakingcontractAddress,
          amount
        );
        await approveTx.wait();
        console.log("Approved successfully!");
        alert("Approved successfully!");
      } else {
        console.log("Already approved!");
      }
    } catch (error) {
      console.error("Error approving:", error);
      // Handle the error as needed
    }
  };

  const handleStake = async (event) => {
	event.preventDefault();
    try {
      const contract = new ethers.Contract(
        stakingcontractAddress,
        stakingcontractABI,
        signer
      );

      const amount = ethers.utils.parseUnits(stakeAmount, "wei");
      // const amount = BigNumber.from(stakeAmount).mul(BigNumber.from(10).pow(18));
      await approve(amount);
      const gasLimit = 30000000;

      const tx = await contract.stake(amount, { gasLimit });
      await tx.wait();

      console.log("Staked successfully!");
      alert("Staked successfully!");
      // Add any additional logic or UI updates here
    } catch (error) {
      console.error("Error staking:", error);
      const errorMessage = `Staking Failed! Error: ${error.message}`; // Get the error message
      alert(errorMessage);
      // Handle the error as needed
    }
  };
  const handleUnstake = async (event) => {
	event.preventDefault();
    try {
      const contract = new ethers.Contract(
        stakingcontractAddress,
        stakingcontractABI,
        signer
      );

	  const sevenDaysInSeconds = 7  * 24 * 60 * 60; // 7 days in seconds
	  const stake = await contract.stakers(signer.getAddress());
	  const { timestamp } = stake;
  
	  const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
  
	  if (currentTimestamp < timestamp + sevenDaysInSeconds) {
		throw new Error("Unstake not available yet, wait until 7 days after your last stake.");
	  }

      const gasLimit = 30000000;

      const tx = await contract.unstake({gasLimit});
      await tx.wait();

      console.log("UnStaked successfully!");
      alert("UnStaked successfully!");
      // Add any additional logic or UI updates here
    } catch (error) {
      console.error("Error unstaking:", error);
      const errorMessage = `unStaking Failed! Error: ${error.message}`; // Get the error message
      alert(errorMessage);
      // Handle the error as needed
    }
  };

  return (
    <form
      className={styles.stake}
      style={{ background: "var(--component-gradient-bg)" }}
    >
      <p className={styles.total}>Total Tokens Staked: {totalTokensStaked}</p>
      <h1 className={styles.h1}>Stake</h1>
      <p className={styles.desc}>
        Stake to be entered into the weekly giveaway.
      </p>
      <div className={styles.pills}>
        {hasStaked ? (
          <>
            <input
              type="text"
              className={styles.pill}
              placeholder="Amount"
              onChange={handleInputChange}
              value={stakeAmount}
            />
            <button className={styles.pill} onClick={handleStake}>
              Stake
            </button>
            <button className={styles.pill} onClick={handleUnstake} >
              Unstake
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className={styles.pill}
              placeholder="Amount"
              onChange={handleInputChange}
              value={stakeAmount}
            />
            <button className={styles.pill} onClick={handleStake}>
              Stake
            </button>
          </>
        )}
       
      </div>
    </form>
  );
}
