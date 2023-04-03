import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi'

//components
import Loaderr from "./Loaderr.jsx"

// Pool.sol address and ABI
const PRIZE_POOL_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const POOL_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const TICKET_CONTRACT_ADDRESS = "0xCafac3dD18aC6c6e92c921884f9E4176737C052c";
const POOL_ABI = "abi";
const PRIZE_POOL_ABI = "abi";

// sleep function for testing
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

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

// fetch TVL from the Pool.sol contract
// returns int
const fetchTVL = async (sc_address, abi) => {
    try {
    //   const connectedContract = await getContract(sc_address, abi);
    //   let txn = await connectedContract.TVL();
    //   console.log(txn);
      console.log("Fetching TVL ..")
      sleep(2000);
      console.log("Fetched TVL")
      return 100;
    } catch (error) {
      console.log(error)
      return
    }
}
  

const PrizePools = (props) => {
  const [TVL, setTVL] = useState(0);

  // fetch total deposits, your deposits, total tickets and your tickets
  const fetchDetailsActive = async (connectedContract, your_address) => {
        try {
        console.log("fetching active details")
        sleep(3000)
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

    const fetchDetailsLocked = async (connectedContract, your_address) => {
        try {
        console.log("fetching locked details")
        sleep(3000)
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

    const fetchDetailsClosed = async (connectedContract, your_address) => {
        try {
        console.log("fetching closed details")
        sleep(3000)
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

    const { address } = useAccount()
    const [contract, setContract] = useState({});
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

    const depositFunds = (e)=>{
      console.log("deposit")
    }
    const claimPrize = (e)=>{
      console.log("claim")
    }

  useEffect( () => {
    const fetchPrizePoolAndTVL = async () => {
        setLoading(true)
        const tvl = await fetchTVL(POOL_CONTRACT_ADDRESS, POOL_ABI);
        setTVL(tvl);
        const pp_contract = await getContract(PRIZE_POOL_CONTRACT_ADDRESS, PRIZE_POOL_ABI)
        setContract(pp_contract);
        // const dep_deadline = await pp_contract.depositionDeadline();
        const dep_deadline = 1580554757000;
        setDepositDeadline(dep_deadline)
        // const withdraw_time = await pp_contract.nextDrawTime();
        const withdraw_time = 1680554757000;
        setWithdrawTime(withdraw_time)
        if(Date.now()<dep_deadline){
          setState("Active")
          await fetchDetailsActive(contract,address);
        }
        else if(Date.now()<withdraw_time){
          setState("Locked")
          await fetchDetailsLocked(contract,address);
        }
        else{
          setState("Closed")
          await fetchDetailsClosed(contract,address);
        }
        setLoading(false)
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
      <li>Prize Pool address: {TICKET_CONTRACT_ADDRESS}</li>
      <li>Prize Pool token: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2</li>
      <li>Deposit Deadline: {depositDeadline}</li>
      <li>Withdrawal Time: {withdrawTime}</li>
      <li>Yearn Vault Utilised: 0xe1237aA7f535b0CC33Fd973D66cBf830354D16c7</li>
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
        {props.type!=="Active" ?
        (props.type==="Locked" ? 
        <></> :
        <button type="button" className="btn btn-primary" onClick={claimPrize}> Claim Your Prize! </button> ) :
        <button type="button" className="btn btn-primary" onClick={depositFunds}> Deposit </button> }

    </div>

    </div>}
    </>
    );
};

export default PrizePools;