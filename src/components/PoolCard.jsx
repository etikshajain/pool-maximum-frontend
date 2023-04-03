import React, { useEffect, useState, useRef } from "react";

import { ethers } from "ethers";
import { useAccount, useBalance } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import { sendTransaction, prepareSendTransaction } from '@wagmi/core'

// sleep function for testing
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const ABI = "";


const PoolCard = (props) => {
  const { address, isConnecting, isDisconnected } = useAccount()

  // fetch contract using abi and address
    const getContract = async (sc_address, abi) => {
        try {
        const { ethereum } = window;
    
        if (ethereum) {
        //   const provider = new ethers.providers.Web3Provider(ethereum);
        //   const signer = provider.getSigner();
        //   const connectedContract = new ethers.Contract(sc_address, abi, signer);
            console.log("Fetching contract ..")
            sleep(2000);
            console.log("This is the connected contract")
            return "connectedContract";
    
        } else {
            console.log("Ethereum object doesn't exist!");
        }
        } catch (error) {
        console.log(error)
        return
        }
    }

    // fetch total deposits, your deposits, total tickets and your tickets
    const fetchDetailsActive = async (contractAddress, your_address) => {
        try {
        console.log("fetching active details")
        sleep(3000)
        // let connectedContract = await getContract(contractAddress, ABI);
        // fetch total deposits in the pool
        // let td = await connectedContract.totalDeposits();
        setTotalDeposits(100)

        // fetch your deposits in the pool
        // let yd = await connectedContract.deposits(your_address);
        setYourDeposit(10)

        return 0;
        } catch (error) {
        console.log(error)
        return
        }
    }

    const fetchDetailsLocked = async (contractAddress, your_address) => {
        try {
        console.log("fetching locked details")
        sleep(3000)
        // let connectedContract = await getContract(contractAddress, ABI);
        // fetch total deposits in the pool
        // let td = await connectedContract.totalDeposits();
        setTotalDeposits(101)

        // fetch total tickets in the pool
        // let tt = await connectedContract.totalTicketSupply();
        setTicketsCirculated(1000)

        // fetch your deposits in the pool
        // let yd = await connectedContract.deposits(your_address);
        setYourDeposit(11)

        // fetch your tickets in the pool
        // let yt = await connectedContract.tickets(your_address);
        setYourTickets(112)

        return 0;
        } catch (error) {
        console.log(error)
        return
        }
    }

    const fetchDetailsClosed = async (contractAddress, your_address) => {
        try {
        console.log("fetching closed details")
        sleep(3000)
        // let connectedContract = await getContract(contractAddress, ABI);
        // fetch total deposits in the pool
        // let td = await connectedContract.totalDeposits();
        setTotalDeposits(102)

        // fetch total tickets in the pool
        // let tt = await connectedContract.totalTicketSupply();
        setTicketsCirculated(1001)

        // fetch your deposits in the pool
        // let yd = await connectedContract.deposits(your_address);
        setYourDeposit(12)

        // fetch your tickets in the pool
        // let yt = await connectedContract.tickets(your_address);
        setYourTickets(113)

        // fetch total interest
        // let ti = await connectedContract.totalInterest();
        setTotalInterest(500)

        // fetch your prize
        // let yp = await connectedContract.calculateInterest(your_address);
        setYourPrize(20)

        // fetch winner or not
        // let w = await connectedContract.checkWinner();
        setWinner(true)

        return 0;
        } catch (error) {
        console.log(error)
        return
        }
    }

  const [totalDeposits, setTotalDeposits] = useState(0);
  const [ticketsCirculated, setTicketsCirculated] = useState(0);
  const [yourDeposit, setYourDeposit] = useState(0);
  const [yourTickets, setYourTickets] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [yourPrize, setYourPrize] = useState(0);
  const [winner, setWinner] = useState(false);
  const [newDeposit,setNewDeposit]=useState({value:0});

  const handleOnChange = (e)=>{
    setNewDeposit({...newDeposit,[e.target.name]:e.target.value});
  }
  const handleClick = (e)=>{
      editNote(note.id,note.etitle,note.edescription,note.etag);
  }
 

  return (
    <>
    <div className="row poolRow">
        <div className="col poolColumn">
        <ul>
            <li>Chain: Ethereum</li>
            <li>Prize Pool address: {props.prizePool.prizePoolAddress}</li>
            <li>Prize Pool token: {props.prizePool.tokenAddress}</li>
            <li>Deposit Deadline: {props.prizePool.depositionDeadline}</li>
            <li>Withdrawal Time: {props.prizePool.withdrawalTime}</li>
            <li>Yearn Vault Utilised: {props.prizePool.yearnVaultAddress}</li>
            <li>Award Share for winner: {props.prizePool.winnerAwardShare}</li>
        </ul>
        </div>
        <div className="col poolColumn">
        {props.type!=="active" ?
        (props.type==="locked" ? 
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={fetchDetailsLocked(props.prizePool.prizePoolAddress, address)}> View Prize Pool </button> :
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={fetchDetailsClosed(props.prizePool.prizePoolAddress, address)}> View Prize Pool </button> ) :
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={fetchDetailsActive(props.prizePool.prizePoolAddress, address)}> View Prize Pool </button> }

        </div>
    </div>

    {/* Modal */}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{props.type} Prize Pool</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div className="poolColumn">
            <ul>
                <li>Chain: Ethereum</li>
                <li>Prize Pool address: {props.prizePool.prizePoolAddress}</li>
                <li>Prize Pool token: {props.prizePool.tokenAddress}</li>
                <li>Deposit Deadline: {props.prizePool.depositionDeadline}</li>
                <li>Withdrawal Time: {props.prizePool.withdrawalTime}</li>
                <li>Yearn Vault Utilised: {props.prizePool.yearnVaultAddress}</li>
                <li>Award Share for winner: {props.prizePool.winnerAwardShare}</li>

                <li>Total Amount deposited: {totalDeposits}</li>
                <li>Your deposit in Pool: {yourDeposit}</li>
                {props.type!=="active" ? 
                <><li>Total Tickets Circulated: {ticketsCirculated}</li>
                <li>Your tickets in Pool: {yourTickets}</li></>: <></>}
                {props.type==="closed" ?
                <><li>Are you a winner: {winner}</li>
                <li>Total Interest accured: {totalInterest}</li>
                <li>Your Prize to Claim: {yourPrize}</li></>: <></>}
            </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            {props.type==="active"?<button type="button" class="btn btn-primary">Deposit</button>:<></>}
            {props.type==="closed"?<button type="button" class="btn btn-primary">Claim Prize</button>:<></>}
        </div>
        </div>
    </div>
    </div>
    </>
    );
};

export default PoolCard;