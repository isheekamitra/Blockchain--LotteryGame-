import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";
class App extends React.Component {
state={
  manager:'',
  players:[],
  balance:'',
  value:'',
  message:''
};

 async componentDidMount(){
    const manager= await lottery.methods.manager().call();
    const players= await lottery.methods.getPlayers().call();
    const balance= await web3.eth.getBalance(lottery.options.address)
    this.setState({manager:manager ,players:players,balance:balance});
  }
  onSubmit=async(event)=>{
    event.preventDefault();

    const accounts=await web3.eth.getAccounts();


  this.setState({message:'Working on giving you entry to the pool...Please wait for few moments!'})
    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei(this.state.value,'ether')
    });
    this.setState({message:'Congratulations!! You are now a part of the pool.'})
  };
  winner=async(event)=>{
    const accounts=await web3.eth.getAccounts();


    this.setState({message:'Deciding Winner...'})
      await lottery.methods.pickWinner().send({
        from:accounts[0],
      
      });
      this.setState({message:'Winner Declared!!'})
  }
  render() {
    return (
      
      <div style={{textAlign:"center"}}>
        <h2 style={{color:'hotpink'}}>Lottery Game!!</h2>
        <p style={{color:'indigo'}}>This contract is managed by {this.state.manager} <br/> There are currently {this.state.players.length} number of people
        competing in our game to with an amount of {web3.utils.fromWei(this.state.balance,'ether')} ether ! 
        </p>

        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck!! Wohhooo good luck :)</h4>
          <label style={{color:'indigo'}}>Amount of ether you wanna put into the game to enter</label>
          
          <div>
          <br/>
          <input
          value={this.state.value}
            onChange={event=>this.setState({value:event.target.value})}
          />
        
          </div>
          <br/>
          <button style={{margin:'10px',padding:'10px',background:'pink'}}>click to Enter </button>
        </form>
        <hr/>
        <h4>Ready to pick a winner?</h4> <p>(Only for manager and office use)</p>
        <button onClick={this.winner} style={{margin:'10px',padding:'10px',background:'pink'}}>Pick THE Winneeer Winnerrr!!!</button>
        <h1 >{this.state.message}</h1>
      </div>
    
    );
  }
}
export default App;

