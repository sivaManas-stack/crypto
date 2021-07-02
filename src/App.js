import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "./Index.css";
import Coin from "./Coin"


 const App = ()=> {
   const [coins, setCoins] = useState([]);
   const [search, setSearch] = useState("");
   useEffect(() => {
      axios.get ('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
       .then(res =>{
    
         setCoins(res.data);
       }).catch(error => console.log(error))
    },[]);
      
   const handleChange = e => {
     setSearch(e.target.value)
   }

   const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()))


     


   return ( 
     <>
    <div className = "coin-app">
      <div className = "coin-search">
        <h1 className ="coin-text">Search Crypto </h1>
        <form>
          <input type = "text"
          placeholder = "currency"
          className ="coin-input" onChange = {handleChange}/>
          </form>
          </div>
        
          {filteredCoins.map(coin => {
            return (
              <Coin key = {coin.id}
               name= {coin.name} 
               image = {coin.image}
               low = {coin.low_24h}
               high = {coin.high_24h}
               price = {coin.current_price}
               priceChange = {coin.price_change_percentage_24h}
               volume = {coin.total_volume}/>
            )
          })}
          </div>

    
     </>
   );
 };

export default App;