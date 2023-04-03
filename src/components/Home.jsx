import React, { useEffect } from "react";

const Home = () => {

  useEffect( () => {
    
  }, []);

  return (
  <div>
  <span className="drawTimer">Next draw time is in ...</span>
  <span className="drawTimer">Total Value locked is ...</span>
  <div className="home">
    <h1 className="home_heading">Pool Maximum</h1>
    <h4 className="home_subheading">Maximise your earnings and <br/> Win big with DeFi Prize Pools</h4>
  </div>

  <button type="button" className="disconnected btn btn-primary btn-lg">Deposit to Win</button>

  {/* <div className="howitworks">
  <h1 className="home_heading">How it Works</h1>
  <div class="container text-center">
  <div class="row">
      <div class="col">
        Column
      </div>
      <div class="col">
        Column
      </div>
    </div>
  </div>
  </div> */}

  </div>);
};

export default Home;