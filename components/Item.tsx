import React, { useEffect, useState } from "react";
import { Item } from "@/interfaces/item";
import Price from "@/interfaces/prices";
import { styled } from "styled-components";
import ImageLoading from "./ImageLoading";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";


const StyledItem = styled.div`
  width: auto;
  height: auto;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;

const StyledContentModal = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;
const ModalDetailedInformations = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  grid-template-rows: repeat(2, minmax(100px, 1fr));
`;
const SingleDetailsModal = styled.div`
  padding: 10px;
`;

const SucessSpan = styled.span`
  color: #96f022;
`;
const ErrorSpan = styled.span`
  font-weight: 500;
  color: #ffffff;
`;

const Item = ({ item, coin }: { item: Item; coin: number }) => {
  const [price, setPrice] = React.useState<Price>();
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);

  useEffect(
    function () {
      const getPrices = async () => {
        const res = await fetch(
          `/api/getPrices/${item.market_name.replaceAll("&", "%26")}`
        );
        const data = await res.json();
        setPrice(data);
      };
      getPrices();
    },
    [item.market_name]
  );
  if (price) item.price = price;

  return (
    <>
      <StyledItem onClick={onOpenModal}>
        <span>{item.name}</span>
        <div>
          <ImageLoading
            alt={`${item.name}`}
            href={`${item.icon_url}`}
            width={40}
            height={40}
          />
        </div>
        <div>
          {item.price?.success === true ? (
            <SucessSpan>
              Average Price:{" "}
              {(Number(item.price.average_price) * coin).toFixed(2)}
            </SucessSpan>
          ) : (
            <ErrorSpan>No price available</ErrorSpan>
          )}
        </div>
      </StyledItem>
      <Modal open={open} onClose={onCloseModal} styles={{modal: {background:"#333232", borderRadius: "15px"}}}>
        <StyledContentModal>
          <h4>{item.name}</h4>
          <ImageLoading
            alt={`${item.name}`}
            href={`${item.icon_url}`}
            width={150}
            height={150}
          />
          <ModalDetailedInformations>
            <div>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
              <SingleDetailsModal>Marketable: {}</SingleDetailsModal>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
            </div>
            <div>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
            </div>
            <div>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
              <SingleDetailsModal>Type: {item.type}</SingleDetailsModal>
            </div>
          </ModalDetailedInformations>
        </StyledContentModal>
      </Modal>
    </>
  );
};

export default Item;
