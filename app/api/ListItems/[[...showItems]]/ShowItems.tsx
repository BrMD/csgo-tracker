"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Item from "@/components/Item";
import SteamObject from "@/interfaces/steamObject";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Coins from "@/interfaces/coins";
import { Item as InterfaceItem } from "@/interfaces/item";
import { sort } from "fast-sort";
import Button from "@/components/Button";

const StyledItems = styled.div`
  width: 96vw;
  height: 96%;
  margin: 30px;
  border-radius: 10px;
  background-color: #4e4e4e;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const StyledFixed = styled.div`
  position: fixed;
  left: 5%;
  top: 1%;
`;
const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`
const ShowItems = () => {
  const [itemsCs, setItemsCs] = React.useState<SteamObject>();
  const itemsss = JSON.parse(sessionStorage.getItem('itemsCs')|| '{}')
  const [coins, setCoins] = React.useState<Coins>();
  const [selectedCoin, setSelectedCoin] = useState("1");
  const [numberItemsPerPage, setNumberItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchByName, setSearchByName] = useState("")
  const [itemsSorted, setItemsSorted] = useState(Array<InterfaceItem | undefined>);

  const searchParams = useSearchParams();
  const search = searchParams.get("key");
  const router = useRouter();
  let arrayItems: SteamObject;

  function handleBack() {
    setItemsCs(undefined);
    setCoins(undefined);
    router.back();
  }
  function handleNumPages(numItemsPages:number){
    
    setCurrentPage(0);
    setNumberItemsPerPage(numItemsPages)
  }
  function handleCurrentPage(numPage: number) {
    setCurrentPage(numPage);
  }
  
  function handleOrderby(Order: string) {
    if (!itemsCs) return;

    const arrayNoPrices = itemsCs.descriptions.filter(
      (item: InterfaceItem) => item.price.success === "false"
    );
    const arrayWithPrices = itemsCs.descriptions.filter(
      (item: InterfaceItem) => item.price.success === true
    );
    console.log(arrayWithPrices);
    if (Order === "HighestPrice") {
      const highestPrice = sort(arrayWithPrices).desc(
        (item: InterfaceItem) => +item.price.average_price
      );
      return [...highestPrice, ...arrayNoPrices];
    }
    if (Order === "LowestPrice") {
      const lowestPrice = sort(arrayWithPrices).asc(
        (item: InterfaceItem) => +item.price.average_price
      );
      return [...lowestPrice, ...arrayNoPrices];
    }
    if (Order === "OrderAZ") {
      const orderAlphabheticAZ = sort([
        ...arrayWithPrices,
        ...arrayNoPrices,
      ]).asc((item: InterfaceItem) => item.name);
      return orderAlphabheticAZ;
    }
    if (Order === "OrderZA") {
      const orderAlphabheticAZ = sort([
        ...arrayWithPrices,
        ...arrayNoPrices,
      ]).desc((item: InterfaceItem) => item.name);
      return [...orderAlphabheticAZ, ...arrayNoPrices];
    }
    return [...arrayWithPrices, ...arrayNoPrices];
  }
  
  
    function handleOrder(orderBy:String) {
      setItemsSorted(handleOrderby(orderBy));
    }
    
  useEffect(function(){
    setItemsCs(itemsss);
    setItemsSorted(itemsss.descriptions);
  },[])
 
  const handleSearchParams = (word:string) => {
    if(word === null) return;
    setSearchByName(word);
  };
  
  let arraySearched = [];
  if (searchByName.length > 0) {
      arraySearched = itemsSorted.filter((item) => {
        return item?.name.match(searchByName);
  });
  setItemsSorted(arraySearched)
  }

  useEffect(function () {
    const getCurrencys = async () => {
      const res = await fetch(
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ueSLnsniTYleqvyDK9iRiDhO5Ogl9FJOtYoVhdhZ"
      );
      const data = await res.json();
      setCoins(data);
    };
    getCurrencys();
  }, []);

  if (!itemsCs) {
    return <span>No items has been fatched</span>;
  } else {
    console.log(itemsCs);
   console.log(itemsSorted);
    if (!itemsSorted) return <div>No items Found</div>;

    let ItemsPerPage = [];
    for (
      let index = 0;
      index < itemsSorted.length;
      index += numberItemsPerPage
    ) {
      ItemsPerPage.push(itemsSorted.slice(index, index + numberItemsPerPage));
    }

    return (
      <StyledMainDiv>
        {coins?.data && (
          <StyledFixed>
            <select onChange={(e) => setSelectedCoin(e.target.value)}>
              {Object.entries(coins.data).map((currency, index) => {
                return currency[0] === "USD" ? (
                  <option key={index} value={currency[1]}>
                    {currency[0]}
                  </option>
                ) : (
                  <option key={index} value={currency[1]}>
                    {currency[0]}
                  </option>
                );
              })}
            </select>
            <button onClick={handleBack}>Back to Home</button>
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
            <input type="text" onChange={(e) => handleSearchParams(e.target.value)}/>
          </StyledFixed>
        )}
        <StyledItems>
          {
          ItemsPerPage.length>0?
          ItemsPerPage[currentPage].map((item, index) => (
            <Item item={item} coin={Number(selectedCoin)} key={index}></Item>
          )):<></>}
        </StyledItems>
        <div>
          {ItemsPerPage.map((_, index) => (
            <Button key={index} index={index} onHandleClick={handleCurrentPage} currentPage={currentPage}>
              {index + 1}
            </Button>
          ))}
        </div>
      </StyledMainDiv>
    );
  }
};

export default ShowItems;
