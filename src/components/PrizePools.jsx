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
let customHttpProvider = new ethers.providers.JsonRpcProvider(url)
const PRIZE_POOL_CONTRACT_ADDRESS = "0x2789c2c7A449a3749597748D500B1C6E78E18D41";
const POOL_CONTRACT_ADDRESS = "0xAC9bea429642C77F4D8412fE8AA312436A97Df64";
const TICKET_CONTRACT_ADDRESS = "0x67b82280bd0D2d3C94287EF7755316d4b8D89C14";
const TOKEN_CONTRACT_ADDRESS_ETH = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
const TOKEN_CONTRACT_ADDRESS_WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 ";
const PRIZE_POOL_OWNER_ADDRESS = "0x6370Bd80276265Bbb648371DA719793EA3e964A6";
const YEARN_VAULT_ADDRESS = "0xe1237aA7f535b0CC33Fd973D66cBf830354D16c7"

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
        console.log("fetching your deposits");
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
        console.log(ethers.utils.formatEther(td))
        setTotalDeposits(ethers.utils.formatEther(td))

        // fetch total tickets in the pool
        console.log("fetching total tickets")
        let tt = await connectedContract.totalTicketSupply();
        console.log(ethers.utils.formatEther(tt))
        setTicketsCirculated(ethers.utils.formatEther(tt))

        // fetch your deposits in the pool
        console.log("fetching your deposits")
        let yd = await connectedContract.deposits(your_address);
        console.log(ethers.utils.formatEther(yd))
        setYourDeposit(ethers.utils.formatEther(yd))

        // fetch your tickets in the pool
        console.log("fetching your tickets")
        let yt = await connectedContract.tickets(your_address);
        console.log(ethers.utils.formatEther(yt))
        setYourTickets(ethers.utils.formatEther(yt))

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
        console.log(ethers.utils.formatEther(td))
        setTotalDeposits(ethers.utils.formatEther(td))

        // fetch total tickets in the pool
        console.log("fetching total tickets")
        let tt = await connectedContract.totalTicketSupply();
        console.log(ethers.utils.formatEther(tt))
        setTicketsCirculated(ethers.utils.formatEther(tt))

        // fetch your deposits in the pool
        console.log("fetching your deposits")
        let yd = await connectedContract.deposits(your_address);
        console.log(ethers.utils.formatEther(yd))
        setYourDeposit(ethers.utils.formatEther(yd))

        // fetch your tickets in the pool
        console.log("fetching your tickets")
        let yt = await connectedContract.tickets(your_address);
        console.log(ethers.utils.formatEther(yt))
        setYourTickets(ethers.utils.formatEther(yt))

        // fetch total interest yo
        console.log("fetching total interest")
        let ti = await connectedContract.totalInterest();
        console.log(ethers.utils.formatEther(ti))
        setTotalInterest(ethers.utils.formatEther(ti))

        // fetch your prize
        console.log("fetching your prize")
        let yp = await connectedContract.calculateInterest(your_address);
        console.log(ethers.utils.formatEther(yp))
        setYourPrize(ethers.utils.formatEther(yp))

        // fetch winner or not
        console.log("fetching whether winner")
        let w = await connectedContract.checkwinner();
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
      const balanceInEth = ethers.utils.formatEther(balance);
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

    const { address } = useAccount();
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

    const depositFunds = async (e)=>{
      // e.preventDefault()
      console.log("depositing");
      await depositToPrizePool(address, 1, e);
    }
    const claimPrize = async (e)=>{
      console.log("claiming");
      const connectedContract = await getContract(PRIZE_POOL_CONTRACT_ADDRESS, PRIZE_POOL_ABI.abi, customHttpProvider)
      await connectedContract.claim(); 
    }

    const depositToVault = async (e)=>{
      console.log("deposit to vault");
      const connectedContract = await getContract(PRIZE_POOL_CONTRACT_ADDRESS, PRIZE_POOL_ABI.abi, customHttpProvider)
      await connectedContract.depositToYv();
    }

    const withdrawFromVault = async (e)=>{
      console.log("withdraw from vault");
      const connectedContract = await getContract(PRIZE_POOL_CONTRACT_ADDRESS, PRIZE_POOL_ABI.abi, customHttpProvider)
      // send 0.1 eth to the prize pool
      console.log("sending 0.1 ether");
      const signer = customHttpProvider.getSigner(address);
      const tx = {
          to: PRIZE_POOL_CONTRACT_ADDRESS,
          value: ethers.utils.parseEther('0.1', 'ether'),
          gasLimit: 50000,
      };
      const transaction = await signer.sendTransaction(tx);
      console.log("sent");
      await connectedContract.withdrawFromYv()
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
        console.log(contract)
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
    <table className="container">
    <span class="badge text-bg-dark">Deposit Deadline: {depositDeadline}</span>
    <br/>
    <span class="badge text-bg-dark">Withdrawal Time: {withdrawTime}</span>
    {state==="Closed"?<><br/><span class="badge text-bg-light">{winner?"Yes":"No"}</span></>:<></>}
      <tr><th>Chain</th> <td>Ethereum</td></tr>
      <tr><th>Prize Pool address</th> <td>{PRIZE_POOL_CONTRACT_ADDRESS}</td></tr>
      <tr><th>Ticket address</th> <td>{TICKET_CONTRACT_ADDRESS}</td></tr>
      <tr><th>Prize Pool token</th> <td>{TOKEN_CONTRACT_ADDRESS_ETH}</td></tr>
      <tr><th>Yearn Vault Utilised</th> <td>{YEARN_VAULT_ADDRESS}</td></tr>
      <tr><th>Award Share for winner</th> <td>80%</td></tr>
      <tr><th>Total Amount deposited</th> <td>{totalDeposits}</td></tr>
      <tr><th>Your deposit in Pool</th> <td>{yourDeposit}</td></tr>

      {state!=="Active" ? 
      <>
      <tr><th>Total Tickets Circulated</th> <td>{ticketsCirculated*(10**18)}</td></tr>
      <tr><th>Your tickets in Pool</th> <td>{yourTickets*(10**18)}</td></tr>
      </>: <></>}
      {state==="Closed" ?
      <>
      <tr><th>Total Interest accured</th> <td> {totalInterest}</td></tr>
      <tr><th>Your Prize to Claim</th> <td> {yourPrize}</td></tr></>: <></>}

    <tr>
        <td>{state!=="Active" ?
        (state==="Locked" ? 
        <></> :
        (yourTickets===0 ? <button type="button" className="btn btn-primary" onClick={claimPrize}> Claim Your Prize! </button> : <button type="button" className="btn btn-primary" onClick={claimPrize} disabled> Claimed </button>) ) :
        <button type="button" className="btn btn-primary" onClick={depositFunds}> Deposit 1 ETH </button> }
        </td>
        <td>{address===PRIZE_POOL_OWNER_ADDRESS ? <>
          {state==="Locked"?<>
          <button type="button" className="btn btn-primary" onClick={depositToVault}> Deposit to Yearn Vault </button>
          </>:<>
          <button type="button" className="btn btn-primary" onClick={depositToVault} disabled> Deposit to Yearn Vault </button>
          </>}
        </> : <></>}</td>
        <td>{address===PRIZE_POOL_OWNER_ADDRESS ? <>
          {state==="Closed"?<>
          <button type="button" className="btn btn-primary" onClick={withdrawFromVault}> Withdraw from yearn vault </button>
          </>:<>
          <button type="button" className="btn btn-primary" onClick={withdrawFromVault} disabled> Withdraw from Yearn Vault </button>
          </>}
        </> : <></>}</td>
    </tr>
    </table>

    </div>}
    </>
    );
};

export default PrizePools;