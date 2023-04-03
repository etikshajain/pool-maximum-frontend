import React, { useEffect, useState } from "react";

//components
import PoolCard from "./PoolCard.jsx"
import Loaderr from "./Loaderr.jsx"

// sample pools
const pools =[
    {
        prizePoolAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        tokenAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        yearnVaultAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        depositionDeadline:1780524860000,
        withdrawalTime:1980524860000,
        winnerAwardShare:80
    },
    {
        prizePoolAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        tokenAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        yearnVaultAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        depositionDeadline:1480524860000,
        withdrawalTime:1980524860000,
        winnerAwardShare:80
    },
    {
        prizePoolAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        tokenAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        yearnVaultAddress:"0xa7873dFD4610B22f9C88129d01ABc993653CACD6",
        depositionDeadline:1480524860000,
        withdrawalTime:1580524860000,
        winnerAwardShare:80
    },
]

// Pool.sol address and ABI
const CONTRACT_ADDRESS = "0xa7873dFD4610B22f9C88129d01ABc993653CACD6";
const ABI = "abi"

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

// fetch all pools from the Pool.sol contract
// returns array of structs
const fetchAllPrizePools = async (sc_address, abi) => {
    try {
    //   const connectedContract = await getContract(sc_address, abi);
    //   let txn = await connectedContract.fetchPools();
    //   console.log(txn);
      console.log("Fetching prize pools ..")
      sleep(3000);
      console.log("Fetched pools")
      return pools;
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
  const [prizePools, setPrizePools] = useState([]);
  const [TVL, setTVL] = useState(0);

  useEffect( () => {
    const fetchPrizePoolsAndTVL = async () => {
        const tvl = await fetchTVL(CONTRACT_ADDRESS, ABI);
        setTVL(tvl);
        const pps = await fetchAllPrizePools(CONTRACT_ADDRESS, ABI);
        setPrizePools(pps);
    }
    fetchPrizePoolsAndTVL();
  }, []);

  return (
    <>
    {prizePools.length===0 ? <Loaderr/> :
    <div>
    {console.log(prizePools)}
    <span className="drawTimer">Next draw time is in ...</span>
    <span className="drawTimer">Total Value locked is ...{TVL}</span>
    <h2>Active</h2>
    <div className="container text-center prizePoolContainer">
        {prizePools.map((prizePool) => {
            if(Date.now()<prizePool.depositionDeadline){
                console.log("here1");
                return <PoolCard prizePool={prizePool} type={"active"} key={prizePool.uniqueId}/>
            }
            return ""
        })}
    </div>
    <h2>Locked</h2>
    <div className="container text-center prizePoolContainer">
        {prizePools.map((prizePool) => {
            if(Date.now()>prizePool.depositionDeadline && Date.now()>prizePool.withdrawalTime){
                console.log("here2");
                return <PoolCard prizePool={prizePool} type={"locked"} key={prizePool.uniqueId}/>
            }
            return ""
        })}
    </div>
    <h2>Closed</h2>
    <div className="container text-center prizePoolContainer">
        {prizePools.map((prizePool) => {
            if(Date.now()>prizePool.withdrawalTime){
                console.log("here3");
                return <PoolCard prizePool={prizePool} type={"closed"} key={prizePool.uniqueId}/>
            }  
            return ""
        })}
    </div>
    </div>}
    </>
    );
};

export default PrizePools;