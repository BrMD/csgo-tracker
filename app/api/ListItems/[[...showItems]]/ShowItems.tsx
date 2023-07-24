"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Item from "@/components/Item";
import SteamObject from "@/interfaces/steamObject";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Coins from "@/interfaces/coins";
import { Item as InterfaceItem } from "@/interfaces/item";
import { sort } from "fast-sort";

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

const ShowItems = () => {
  const [itemsCs, setItemsCs] = React.useState<SteamObject>();
  const [coins, setCoins] = React.useState<Coins>();
  const [selectedCoin, setSelectedCoin] = useState("1");
  const [numberItemsPerPage, setNumberItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(0);
  const [orderBy, setOrderBy] = useState("None");
  const [itemsSorted, setItemsSorted] = useState(Array<InterfaceItem>);

  const searchParams = useSearchParams();
  const search = searchParams.get("key");
  const router = useRouter();
  let arrayItems: SteamObject;

  function handleBack() {
    setItemsCs(undefined);
    setCoins(undefined);
    router.back();
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

  useEffect(
    function () {
      setItemsSorted(handleOrderby(orderBy));
    },
    [orderBy]
  );

  useEffect(
    function () {
      const getDynamicProps = async () => {
        const res = await fetch(`/api/getItemsCs/${search}`);
        const data = await res.json();
        arrayItems = data;
        arrayItems.descriptions.map(
          async (item) => (item.price = await getPrices(item))
        );

        setItemsCs(arrayItems);
        setItemsSorted(arrayItems.descriptions);
      };
      getDynamicProps();
    },
    [search]
  );
  const getPrices = async (item: InterfaceItem) => {
    const res = await fetch(
      `/api/getPrices/${item.market_name.replaceAll("&", "%26")}`
    );
    const data = await res.json();
    return data;
  };
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
    if (!itemsSorted) return;

    let ItemsPerPage = [];
    for (
      let index = 0;
      index < itemsSorted.length;
      index += numberItemsPerPage
    ) {
      ItemsPerPage.push(itemsSorted.slice(index, index + numberItemsPerPage));
    }

    return (
      <>
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
            <select onChange={(e) => setNumberItemsPerPage(+e.target.value)}>
              <option value={16}>16</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
            </select>
            <select onChange={(e) => setOrderBy(e.target.value)}>
              <option value={"None"}>none</option>
              <option value={"HighestPrice"}>HighestPrice</option>
              <option value={"LowestPrice"}>LowestPrice</option>
              <option value={"OrderAZ"}>Order Alphabethic Ascending</option>
              <option value={"OrderZA"}>Order Alphabethic Descending</option>
              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
            </select>
          </StyledFixed>
        )}
        <StyledItems>
          {ItemsPerPage[currentPage].map((item, index) => (
            <Item item={item} coin={Number(selectedCoin)} key={index}></Item>
          ))}
        </StyledItems>
        <div>
          {ItemsPerPage.map((_, index) => (
            <button key={index} onClick={() => handleCurrentPage(index)}>
              {index + 1}
            </button>
          ))}
        </div>
      </>
    );
  }
};

export default ShowItems;
