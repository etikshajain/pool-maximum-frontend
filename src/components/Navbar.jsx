import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect} from "react";
const Navbar = () => {

  useEffect( () => {
  }, []);

  return ( 
      <>
          <nav className="navv navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">PoolMaximum</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/PrizePools">Prize Pools</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" rel="noreferrer" href="https://github.com/etikshajain/pool-maximum" target="_blank">Developer</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" rel="noreferrer" href="https://github.com/etikshajain/pool-maximum-frontend" target="_blank">Docs</a>
                    </li>
                </ul>
                <div className="connectWallet">
                    <ConnectButton/>
                </div>
                </div>
            </div>
            </nav>
      </>
  );
};

export default Navbar;