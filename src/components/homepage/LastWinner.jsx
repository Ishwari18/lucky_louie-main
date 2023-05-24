import VibesGif from "../../assets/vibe.gif";
import { ethers } from "ethers";
import React, { useState, useEffect } from 'react';

const styles = {
  lastWinner:
    "w-full p-9  my-4 md:my-0 rounded-3xl relative bg-[color:var(--red)]",
  imgContainer: "rounded-3xl w-[90%] mt-10 mx-auto",
  h1: "text-[1.7em]",
  green: "text-[color:var(--light-green)] underline cursor-pointer",
  orangeYellow: "text-[#F3C53B]",
  winnerInfo: "text-center mt-7",
};

const stakingcontractAddress = "0x1dd63137D6AFE0C02B550bd4798b76c929f20041";
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

export default function LastWinner() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // Create a new instance of the contract using the address and ABI
  const contract = new ethers.Contract(
    stakingcontractAddress,
    stakingcontractABI,
    provider.getSigner()
  );

   // Save the winner's address and amount as state variables
  const [amountWon, setAmountWon] = useState(0);
  const [winnerAddress, setWinnerAddress] = useState('');

  useEffect(() => {
    const fetchJackpotWinner = async () => {
      try {

        const filter = contract.filters.JackpotWon();
        const events = await contract.queryFilter(filter);

        if (events.length > 0) {
          const latestEvent = events[events.length - 1];
          setWinnerAddress(latestEvent.args.winner);
        }
      } catch (error) {
        console.error('Error fetching jackpot winner:', error);
      }
    };
    
    fetchJackpotWinner();
  }, [stakingcontractAddress, provider]);


  return (
    <div className={styles.lastWinner}>
      <h1 className={styles.h1}>Last Winner</h1>
      <img src={VibesGif} alt="" className={styles.imgContainer} />
      <div className={styles.winnerInfo}>
        <p>{`${ethers.utils.formatEther(amountWon)} ETH`}</p>
        <p>Winner's Address: {winnerAddress}</p>
      </div>
    </div>
  );
}
