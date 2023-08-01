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
  font-size: 16px;
  &:hover{
    background-color: #474646;
  }
  text-align: center;
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
  grid-template-columns: repeat(2, minmax(50px, 1fr));
  
`;
const SingleDetailsModal = styled.div`
  padding: 10px;
  display: flex;
`;
const ErrorNoData = styled.div`
  grid-column-start: 0;
  grid-column-end: 2;
`;
const SucessSpan = styled.span`
  color: #96f022;
`;
const ErrorSpan = styled.span`
  font-weight: 500;
  color: #ffffff;
`;
const StyledH4 = styled.h4`
  margin: 8px 12px 5px 12px;
  font-weight: 600;
`
const StyledH5 = styled.h5`
  
`
const Item = ({ item, coin }: { item: Item|undefined; coin: number }) => {
  

  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);


  if(item)  
  return (
    <>
      <StyledItem onClick={onOpenModal}>
        <StyledH4>{item.name}</StyledH4>
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
      <Modal open={open} onClose={onCloseModal} styles={{modal: {background:"#333232", borderRadius: "15px"}, closeButton: {display: "none"}}} >
        <StyledContentModal>
          <h2>{item.name}</h2>
          <ImageLoading
            alt={`${item.name}`}
            href={`${item.icon_url}`}
            width={150}
            height={150}
          />
          
            {item.price?.success === true ? (
            <ModalDetailedInformations>
              <div>
                <SingleDetailsModal><StyledH5>Type:</StyledH5> <div>{item.type}</div></SingleDetailsModal>
                <SingleDetailsModal>Highest Price: {(Number(item.price.highest_price) * coin).toFixed(2)}</SingleDetailsModal>
                <SingleDetailsModal>Lowest Price: {(Number(item.price.lowest_price) * coin).toFixed(2)}</SingleDetailsModal>
              </div>
              <div>
                <SingleDetailsModal>Average Price: {(Number(item.price.average_price) * coin).toFixed(2)}</SingleDetailsModal>
                <SingleDetailsModal>Median Price: {(Number(item.price.median_price) * coin).toFixed(2)}</SingleDetailsModal>
              </div>
            </ModalDetailedInformations>
            ):<ErrorNoData>No data retrieved</ErrorNoData>}
            
          
        </StyledContentModal>
      </Modal>
    </>
  );
};

export default React.memo(Item);
