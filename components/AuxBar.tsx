import Coins from '@/interfaces/coins';
import React from 'react';
import styled from 'styled-components';

const StyledFixed = styled.div`
  position: fixed;
  width: 96.5%;
  left: 1.5%;
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
    border: 1px solid #929292;
    background-color: #37c2c2c1;
    color: #fff;
    text-align: center;
    height: 3em;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.4s;
    &:hover{
        background-color: #248b8bc1;
    }
`
const StyledSelect7em = styled(StyledSelect)`
    width: 7em;
`


const AuxBar = ({handleCoin, coins,handleBack, handleNumPages, handleOrder,handleSearch}:
{handleCoin:Function;coins:Coins|undefined; handleBack:Function;handleNumPages:Function;handleOrder:Function;handleSearch:Function}) => {
    return (
    <StyledFixed>
        <StyledDiv>
            <StyledSelect7em className='selectWidth' onChange={(e:React.ChangeEvent<any>) => handleCoin(e.target.value)} defaultValue={"USD"}>
                <option value={"1"}>{"USD"}</option>
                {coins && Object.entries(coins.data).map((currency, index) =>
                {
                    return currency[0] === "USD" ? (<></>):(<option key={index} value={currency[1]}>{currency[0]}</option>)
                }
                            
                )}
            </StyledSelect7em>
            
            <StyledSelect7em className='selectWidth' onChange={(e:React.ChangeEvent<any>) => handleNumPages(+e.target.value)}>
                <option value={16}>16</option>
                <option value={24}>24</option>
                <option value={32}>32</option>
            </StyledSelect7em>
            <StyledSelect onChange={(e:React.ChangeEvent<any>) => handleOrder(e.target.value)}>
                <option value={"None"}>None</option>
                <option value={"HighestPrice"}>HighestPrice</option>
                <option value={"LowestPrice"}>LowestPrice</option>
                <option value={"OrderAZ"}>Order Alphabethic Ascending</option>
                <option value={"OrderZA"}>Order Alphabethic Descending</option>
            </StyledSelect>
        </StyledDiv>
        <StyledDiv>
            <button onClick={() => handleBack}>Back to Home</button>
            <input type="text" onChange={(e) => handleSearch(e.target.value)}/>
        </StyledDiv>
    </StyledFixed>
  )
}

export default AuxBar