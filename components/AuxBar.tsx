import Coins from '@/interfaces/coins';
import React, {  useState } from 'react';
import styled from 'styled-components';

const StyledFixed = styled.div`
  position: fixed;
  left: 5%;
  top: 1%;
`;

const AuxBar = ({handleCoin, coins, selectedCoin,handleBack, handleNumPages, handleOrder,handleSearch}:
{handleCoin:Function;coins:Coins|undefined; selectedCoin:string;handleBack:Function;handleNumPages:Function;handleOrder:Function;handleSearch:Function}) => {
    const [NameSelected, setNameSelected] = useState("");

    return (
    <StyledFixed>
        <select onChange={(e) => handleCoin(e.target.value)} defaultValue={"USD"}>
            <option value={"1"}>{"USD"}</option>
            {coins && Object.entries(coins.data).map((currency, index) =>
            {
                return currency[0] === "USD" ? (<></>):(<option key={index} value={currency[1]}>{currency[0]}</option>)
            }
                           
            )}
        </select>
        <button onClick={() => handleBack}>Back to Home</button>
        <select onChange={(e) => handleNumPages(+e.target.value)}>
            <option value={16}>16</option>
            <option value={24}>24</option>
            <option value={32}>32</option>
        </select>
        <select onChange={(e) => handleOrder(e.target.value)}>
            <option value={"None"}>None</option>
            <option value={"HighestPrice"}>HighestPrice</option>
            <option value={"LowestPrice"}>LowestPrice</option>
            <option value={"OrderAZ"}>Order Alphabethic Ascending</option>
            <option value={"OrderZA"}>Order Alphabethic Descending</option>
        </select>
        <input type="text" onChange={(e) => handleSearch(e.target.value)}/>
    </StyledFixed>
  )
}

export default AuxBar