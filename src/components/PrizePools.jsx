import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount, useBalance } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import { sendTransaction, prepareSendTransaction } from '@wagmi/core'

import POOL_ABI from './Abi/Pool.json';
import PRIZE_POOL_ABI from './Abi/PrizePool.json';
import ERC20_ABI from './Abi/ERC20.json';

//components
import Loaderr from "./Loaderr.jsx"

let url = "HTTP://127.0.0.1:7545";
let customHttpProvider = new ethers.providers.JsonRpcProvider(url);
const PRIZE_POOL_CONTRACT_ADDRESS = "0xC95D3467C935a41cF7E0758203475e41F8dD6Ac6";
const POOL_CONTRACT_ADDRESS = "0xc157eA17d93d34ec9Ef6D881b0Ad9587F229EB83";
const TICKET_CONTRACT_ADDRESS = "0x67b82280bd0D2d3C94287EF7755316d4b8D89C14";
const TOKEN_CONTRACT_ADDRESS_ETH = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
const TOKEN_CONTRACT_ADDRESS_WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 ";
const PRIZE_POOL_OWNER_ADDRESS = "0x6370Bd80276265Bbb648371DA719793EA3e964A6";
const YEARN_VAULT_ADDRESS = "0xe1237aA7f535b0CC33Fd973D66cBf830354D16c7";

// sleep function for testing
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// fetch contract using abi and address
const getContract = async (sc_address, abi, your_address) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      console.log("Fetching contract ..");
      const connectedContract = new ethers.Contract(sc_address, abi, signer, your_address);
      console.log("This is the connected contract")
      console.log(connectedContract);
      return connectedContract;

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
    return
  }
}
  

const PrizePools = (props) => {
  const [TVL, setTVL] = useState(0);

  // fetch TVL from the Pool.sol contract
  // returns int
  const fetchTVL = async (sc_address, abi) => {
    try {
      const connectedContract = await getContract(sc_address, abi, address);
      console.log("Fetching TVL ..")
      let txn = await connectedContract.TVL();
      console.log("Fetched TVL")
      console.log(ethers.utils.formatEther(txn));
      return ethers.utils.formatEther(txn);
    } catch (error) {
      console.log(error)
      return
    }
  }

  // fetch total deposits, your deposits, total tickets and your tickets
  const fetchDetailsActive = async (connectedContract, your_address) => {
        try {
        console.log("fetching active details")
        // fetch total deposits in the pool
        console.log("fetching total deposits")
        let td = await connectedContract.totalDeposits();
        console.log(ethers.utils.formatEther(td));
        setTotalDeposits(ethers.utils.formatEther(td))

        // fetch your deposits in the pool
        console.log("fetching your deposits")
        let yd = await connectedContract.deposits(your_address);
        console.log(ethers.utils.formatEther(yd))
        setYourDeposit(ethers.utils.formatEther(yd))

        return 0;
        } catch (error) {
        console.log(error)
        return
        }
    }

    const fetchDetailsLocked = async (connectedContract, your_address) => {
        try {
        console.log("fetching locked details")
        // fetch total deposits in the pool
        console.log("fetching total deposits")
        let td = await connectedContract.totalDeposits();
        console.log(td.toNumber())
        setTotalDeposits(td.toNumber())

        // fetch total tickets in the pool
        console.log("fetching total tickets")
        let tt = await connectedContract.totalTicketSupply();
        console.log(tt.toNumber())
        setTicketsCirculated(tt.toNumber())

        // fetch your deposits in the pool
        console.log("fetching your deposits")
        let yd = await connectedContract.deposits(your_address);
        console.log(yd.toNumber())
        setYourDeposit(yd.toNumber())

        // fetch your tickets in the pool
        console.log("fetching your tickets")
        let yt = await connectedContract.tickets(your_address);
        console.log(yt.toNumber())
        setYourTickets(yt.toNumber())

        return 0;
        } catch (error) {
        console.log(error)
        return
        }
    }

    const fetchDetailsClosed = async (connectedContract, your_address) => {
        try {
        console.log("fetching closed details")
        // fetch total deposits in the pool
        console.log("fetching total deposits")
        let td = await connectedContract.totalDeposits();
        console.log(td.toNumber())
        setTotalDeposits(td.toNumber())

        // fetch total tickets in the pool
        console.log("fetching total tickets")
        let tt = await connectedContract.totalTicketSupply();
        console.log(tt.toNumber())
        setTicketsCirculated(tt.toNumber())

        // fetch your deposits in the pool
        console.log("fetching your deposits")
        let yd = await connectedContract.deposits(your_address);
        console.log(yd.toNumber())
        setYourDeposit(yd.toNumber())

        // fetch your tickets in the pool
        console.log("fetching your tickets")
        let yt = await connectedContract.tickets(your_address);
        console.log(yt.toNumber())
        setYourTickets(yt.toNumber())

        // fetch total interest yo
        console.log("fetching total interest")
        let ti = await connectedContract.totalInterest();
        console.log(ti.toNumber())
        setTotalInterest(ti.toNumber())

        // fetch your prize
        console.log("fetching your prize")
        let yp = await connectedContract.calculateInterest(your_address);
        console.log(yp.toNumber())
        setYourPrize(yp.toNumber())

        // fetch winner or not
        console.log("fetching whether winner")
        let w = await connectedContract.checkWinner();
        console.log(w)
        setWinner(w)

        return 0;
        } catch (error) {
        console.log(error)
        return
        }
    }

    const depositToPrizePool = async (your_address, amount, e) => {
      try {
      // fetch your eth balance
      const connectedContract = await getContract(PRIZE_POOL_CONTRACT_ADDRESS, PRIZE_POOL_ABI.abi, customHttpProvider)
      const tokenContract = await getContract(TOKEN_CONTRACT_ADDRESS_ETH, ERC20_ABI, customHttpProvider)
      
      console.log("checking that you have enough eth")
      const balance = await customHttpProvider.getBalance(your_address);
      const balanceInEth = ethers.utils.formatEther(balance)
      console.log("your eth balance is", balanceInEth)

      if(balance>=amount){
        // send
        console.log("sending")
        const result = await connectedContract.deposit({ value: ethers.utils.parseUnits(amount.toString(), "ether") });
        // const result = await connectedContract.deposit(amount);
        console.log(result)

      }
      else{
        return "Not enough ether"
      }

      return 0;
      } catch (error) {
      console.log(error)
      return
      }
  }

    const { address } = useAccount()
    const [contract, setContract] = useState([]);
    const [totalDeposits, setTotalDeposits] = useState(0);
    const [ticketsCirculated, setTicketsCirculated] = useState(0);
    const [yourDeposit, setYourDeposit] = useState(0);
    const [yourTickets, setYourTickets] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [yourPrize, setYourPrize] = useState(0);
    const [winner, setWinner] = useState(false);
    const [newDeposit,setNewDeposit]=useState({value:0});
    const [state,setState]=useState("");
    const [depositDeadline,setDepositDeadline]=useState(0);
    const [withdrawTime,setWithdrawTime]=useState(0);
    const [loading,setLoading]=useState(true);

    const handleOnChange = (e)=>{
    setNewDeposit({...newDeposit,[e.target.name]:e.target.value});
    }
    const handleClick = (e)=>{
      console.log("clicked")
    // editNote(note.id,note.etitle,note.edescription,note.etag);
    }

    const depositFunds = async (e)=>{
      // e.preventDefault()
      console.log("depositing")
      await depositToPrizePool(address, 10, e);
    }
    const claimPrize = (e)=>{
      console.log("claim")
    }

  useEffect( () => {
    const fetchPrizePoolAndTVL = async () => {
        setLoading(true)
        const tvl = await fetchTVL(POOL_CONTRACT_ADDRESS, POOL_ABI.abi);
        setTVL(tvl);
        const pp_contract = await getContract(PRIZE_POOL_CONTRACT_ADDRESS, PRIZE_POOL_ABI.abi, address)
        // const sender = await pp_contract.checkSender()
        setContract(pp_contract);
        const dep_deadline = await pp_contract.depositDeadline();
        setDepositDeadline(dep_deadline.toNumber()*1000)
        const withdraw_time = await pp_contract.nextDrawTime();
        setWithdrawTime(withdraw_time.toNumber()*1000);
        console.log("here")
        console.log(contract);
        console.log(tvl);
        console.log(depositDeadline);
        console.log(withdrawTime);
        console.log(Date.now());
        if(Date.now()<depositDeadline){
          setState("Active")
          await fetchDetailsActive(pp_contract,address);
        }
        else if(Date.now()<withdrawTime){
          setState("Locked")
          await fetchDetailsLocked(pp_contract,address);
        }
        else{
          setState("Closed")
          await fetchDetailsClosed(pp_contract,address);
        }
        setLoading(false);
    }
    fetchPrizePoolAndTVL();
  }, []);

  return (
    <>
    {loading ? <Loaderr/> :
    <div>
    <span className="drawTimer">Next draw time is in ...</span>
    <br/>
    <span className="drawTimer">Total Value locked is ...{TVL}</span>
    <h2>Prize Pools</h2>
    <div className="container text-center prizePoolContainer">
    <ul>
      <li>Chain: Ethereum</li>
      <li>Prize Pool address: {PRIZE_POOL_CONTRACT_ADDRESS}</li>
      <li>Ticket address: {TICKET_CONTRACT_ADDRESS}</li>
      <li>Prize Pool token: {TOKEN_CONTRACT_ADDRESS_ETH}</li>
      <li>Deposit Deadline: {depositDeadline}</li>
      <li>Withdrawal Time: {withdrawTime}</li>
      <li>Yearn Vault Utilised: {YEARN_VAULT_ADDRESS}</li>
      <li>Award Share for winner: 80%</li>

      <li>Total Amount deposited: {totalDeposits}</li>
      <li>Your deposit in Pool: {yourDeposit}</li>
      {state!=="Active" ? 
      <><li>Total Tickets Circulated: {ticketsCirculated}</li>
      <li>Your tickets in Pool: {yourTickets}</li></>: <></>}
      {state==="Closed" ?
      <><li>Are you a winner: {winner?"Yes":"No"}</li>
      <li>Total Interest accured: {totalInterest}</li>
      <li>Your Prize to Claim: {yourPrize}</li></>: <></>}
    </ul>
    </div>

    <div className="col poolButtons">
        {state!=="Active" ?
        (state==="Locked" ? 
        <></> :
        <button type="button" className="btn btn-primary" onClick={claimPrize}> Claim Your Prize! </button> ) :
        <button type="button" className="btn btn-primary" onClick={depositFunds}> Deposit </button> }

    </div>

    </div>}
    </>
    );
};

export default PrizePools;