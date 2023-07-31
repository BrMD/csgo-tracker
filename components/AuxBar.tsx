import Coins from '@/interfaces/coins';
import React, {  useState } from 'react';
import styled from 'styled-components';

const StyledFixed = styled.div`
  position: fixed;
  width:96%;
  left: 2%;
  top: 1%;
  display: flex;
  justify-content: space-between;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledSelect = styled.select`
    margin: 0px 10px 0px 10px;
`

const AuxBar = ({handleCoin, coins,handleBack, handleNumPages, handleOrder,handleSearch}:
{handleCoin:Function;coins:Coins|undefined; handleBack:Function;handleNumPages:Function;handleOrder:Function;handleSearch:Function}) => {
    return (
    <StyledFixed>
        <StyledDiv>
            <StyledSelect onChange={(e) => handleCoin(e.target.value)} defaultValue={"USD"}>
                <option value={"1"}>{"USD"}</option>
                {coins && Object.entries(coins.data).map((currency, index) =>
                {
                    return currency[0] === "USD" ? (<></>):(<option key={index} value={currency[1]}>{currency[0]}</option>)
                }
                            
                )}
            </StyledSelect>
            <button onClick={() => handleBack}>Back to Home</button>
            <StyledSelect onChange={(e) => handleNumPages(+e.target.value)}>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
            </StyledSelect>
            <StyledSelect onChange={(e) => handleOrder(e.target.value)}>
                <option value={"None"}>None</option>
                <option value={"HighestPrice"}>HighestPrice</option>
                <option value={"LowestPrice"}>LowestPrice</option>
                <option value={"OrderAZ"}>Order Alphabethic Ascending</option>
                <option value={"OrderZA"}>Order Alphabethic Descending</option>
            </StyledSelect>
        </StyledDiv>
        <StyledDiv>
            <input type="text" onChange={(e) => handleSearch(e.target.value)}/>
        </StyledDiv>
    </StyledFixed>
  )
}

export default AuxBar