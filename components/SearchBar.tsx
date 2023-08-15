"use client";
import { Item } from "@/interfaces/item";
import SteamObject from "@/interfaces/steamObject";
import { useRouter } from "next/navigation";
import React,{ useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "styled-components";

const SearchDiv = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 40%;
`;

const StyledH1 = styled.h1`
  font-family: "roboto";
  font-size: 50px;
  color: #fff;
`
const StyledH3 = styled.h3`
  font-family: "roboto";
  font-size: 20px;
  text-align: center;
  color: #fff;
`
const StyledLink = styled.a`
  color: #baeb34;
  outline: none;
`
const Container = styled.div`
  align-items:center;
`
const StyledButton = styled.button`

    margin-left: 6%;
    width: 10em;
    border-radius: 10px;
    background-color: #37c2c2c1 ;
    border:none;
    color: #fff;
    &:hover{
        background-color: #248b8bc1;
    }
    cursor: pointer;
    transition: background-color 0.4s;
    border: 1px solid #fff;
`
const StyledInput = styled.input`
    height: 35px;
    border-radius: 10px;
    text-align: center;
    align-self: center;
    background-color: #fff;
    color:#000;
    border: 1px solid #fff;
    &:focus{
        outline:none;
    }
`

const SearchBar = () => {
  const [steamId, setSteamId] = useState("");
  const [arrayItemsCs, setArrayItemsCs] = React.useState<SteamObject>();
  const router = useRouter();
  const tam = arrayItemsCs?.descriptions.length;
  
  useEffect(function(){
    if(arrayItemsCs?.success === 1){
      const toastNotify = toast.loading("Loading data plear wait...",{
        position: toast.POSITION.TOP_CENTER,
      });
      arrayItemsCs.descriptions.map(async (item, index) => {
        item.price = await getPrices(item)
        if(tam) if(index === tam - 1) {
          sessionStorage.setItem('itemsCs', JSON.stringify(arrayItemsCs));
          toast.update(toastNotify, {render: "Data retrieved successfully", type: "success", isLoading: false, autoClose: 1000})
          setTimeout(() => {
            router.push(`/api/ListItems/?key=${steamId}`);
          }, 2000);
        }
      });
    }
    
  },[arrayItemsCs, tam])
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
    if (data === null) {
      return toast.error(
        "Error on getting Data from your Steam, please try again with a valid SteamID",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        }
      );
    }
    if(data.success === 1){
      setArrayItemsCs(data);
    }  
    
  };
  return (
    <Container>
      <StyledH1>Welcome to csgo Tracker</StyledH1>
      <StyledH3>Don&apos;t know where to find your ID <StyledLink target="_blank" href="https://www.youtube.com/watch?v=2vn8fL2dSM8">Click here</StyledLink></StyledH3>
      <ToastContainer/>
      <SearchDiv>
        <StyledInput
          name="steamid"
          placeholder="Coloque o seu STEAMID"
          onChange={(e:React.ChangeEvent<any>) => setSteamId(e.target.value)}
        />
        <StyledButton onClick={getDynamicProps}>Search</StyledButton>
        
      </SearchDiv>
    </Container>
  );
};

export default SearchBar;
