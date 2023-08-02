"use client";
import { useRouter } from "next/navigation";
import SteamObject from "@/interfaces/steamObject";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Coins from "@/interfaces/coins";
import { Item as InterfaceItem } from "@/interfaces/item";
import { sort } from "fast-sort";
import ItemsShow from "@/components/ItemsShow";
import AuxBar from "@/components/AuxBar";



const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;

`


const ShowItems = () => {
  const [itemsCs, setItemsCs] = React.useState<SteamObject>();
  const itemsss = JSON.parse(sessionStorage.getItem('itemsCs')|| '{}');
  let ItemsPerPage = [];
  const [coins, setCoins] = React.useState<Coins>();
  const [selectedCoin, setSelectedCoin] = useState("1");
  const [numberItemsPerPage, setNumberItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchByName, setSearchByName] = useState("")
  const [itemsSorted, setItemsSorted] = useState(Array<InterfaceItem | undefined>);
  const [orderBy, setorderBy] = useState("None");
  let auxArray;
   useEffect(function(){
    setItemsCs(itemsss);
    setItemsSorted(itemsss.descriptions);
  },[])
  
  function handleOrder(orderBy:string) {
    setorderBy(orderBy)
    setItemsSorted(handleOrderby(orderBy));
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

  const router = useRouter();
  auxArray = itemsss.descriptions;
  const arrayNoPrices = itemsCs?.descriptions.filter(
    (item: InterfaceItem) => item.price.success === "false"
  );
  const arrayWithPrices = itemsCs?.descriptions.filter(
    (item: InterfaceItem) => item.price.success === true
  );

  function handleBack() {
    console.log("aqui");
    setItemsCs(undefined);
    setCoins(undefined);
    router.back();
  }
  function handleSearch(value:string){
    setSearchByName(value)
  }
  function handleCoin(value:string){
    setSelectedCoin(value);
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
    if(arrayNoPrices === undefined || arrayWithPrices === undefined) return;
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
  if (!itemsCs) {
    return <span>No items has been fatched</span>;
  } else {
    if (!itemsSorted) return <div>No items Found</div>;
    if(orderBy!=='None') auxArray = handleOrderby(orderBy);
      auxArray = auxArray.filter((item:InterfaceItem) => item.name.toLowerCase().includes(searchByName.toLowerCase()));
      
      for (
        let index = 0;
        index < auxArray.length;
        index += numberItemsPerPage
      ) {
        ItemsPerPage.push(auxArray.slice(index, index + numberItemsPerPage));
      }    
    return (
      <StyledMainDiv>
        <AuxBar handleCoin={handleCoin}  coins={coins}  handleBack={handleBack} handleNumPages={handleNumPages} handleOrder={handleOrder} handleSearch={handleSearch}/>
        <ItemsShow ItemsPerPage={ItemsPerPage} currentPage={currentPage} selectedCoin={selectedCoin} onHandleCurrentPage={handleCurrentPage}/>
      </StyledMainDiv>
    );
  }
};

export default ShowItems;
