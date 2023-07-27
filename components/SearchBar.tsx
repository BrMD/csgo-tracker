"use client";
import { Item } from "@/interfaces/item";
import SteamObject from "@/interfaces/steamObject";
import { useRouter } from "next/navigation";
import React,{ useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "styled-components";

const SearchDiv = styled.div`
  position: absolute;
  top: 50%;
`;

const SearchBar = () => {
  const [steamId, setSteamId] = useState("");
  const [arrayItemsCs, setArrayItemsCs] = React.useState<SteamObject>();
  const router = useRouter();
  const getPrices = async (item: Item) => {
    const res = await fetch(
      `/api/getPrices/${item.market_name.replaceAll("&", "%26")}`
    );
    const data = await res.json();
    return data;
  };
  const getDynamicProps = async () => {
    const res = await fetch(`/api/getItemsCs/${steamId}`);
    const data = await res.json();
    if(data.success === 1){
      console.log(data);
      setArrayItemsCs(data);
    }  
if(arrayItemsCs) arrayItemsCs.descriptions.map(async (item) => item.price = await getPrices(item))
    if(arrayItemsCs){
      if(arrayItemsCs.descriptions[arrayItemsCs.descriptions.length - 1].price.success !== undefined){
        console.log("aqui")
        sessionStorage.setItem('itemsCs', JSON.stringify(arrayItemsCs));
      }
    }
    if (data === null) {
      return toast.error(
        "Error on getting Data from your Steam, please try again with a valid SteamID",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        }
      );
    }
   
    const { success } = data;
    // if (success === 1) {
    //   toast.success("Data retrieved successfully", {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 1000,
    //   });
      
    //   setTimeout(() => {
    //     router.push(`/api/ListItems/?key=${steamId}`);
    //   }, 2000);
    // }
  };
  return (
    <>
      <ToastContainer />
      <SearchDiv>
        <input
          name="steamid"
          placeholder="Coloque o seu STEAMID"
          onChange={(e) => setSteamId(e.target.value)}
        />
        <button onClick={getDynamicProps}>Search</button>
        
      </SearchDiv>
    </>
  );
};

export default SearchBar;