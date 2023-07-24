"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "styled-components";

const SearchDiv = styled.div`
  position: absolute;
  top: 50%;
`;

const SearchBar = () => {
  const [steamId, setSteamId] = useState("");
  const [arrayItemsCs, setArrayItemsCs] = useState({});
  const router = useRouter();
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

    const { success } = data;
    if (success === 1) {
      toast.success("Data retrieved successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      setArrayItemsCs({});
      setTimeout(() => {
        router.push(`/api/ListItems/?key=${steamId}`);
      }, 2000);
    }
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
        <button onClick={() => setArrayItemsCs({})}>Clear Array</button>
      </SearchDiv>
    </>
  );
};

export default SearchBar;
