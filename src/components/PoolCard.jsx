import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import { useAccount, useBalance } from 'wagmi'
import { fetchBalance } from '@wagmi/core'
import { sendTransaction, prepareSendTransaction } from '@wagmi/core'

const PoolCard = (props) => {
  let navigate = useNavigate();
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect( () => {
  }, []);

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
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={fetchContract()}>
            View Prize Pool
        </button>
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
            </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
    </>
    );
};

export default PoolCard;