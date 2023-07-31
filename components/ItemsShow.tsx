import { Item as InterfaceItem } from '@/interfaces/item';
import Item from './Item';
import React from 'react'
import styled from 'styled-components';
import Button from './Button';

const StyledItems = styled.div`
  width: 96vw;
  height: 96%;
  margin: 30px;
  border-radius: 10px;
  background-color: #4e4e4e;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const ItemsShow = ({ItemsPerPage, currentPage, selectedCoin, onHandleCurrentPage}:{ItemsPerPage:any;currentPage:number;selectedCoin:string;onHandleCurrentPage:Function}) => {
  return (
    <>
    <StyledItems>
          {
          ItemsPerPage.length>0?
          ItemsPerPage[currentPage].map((item:InterfaceItem, index:number) => (
            <Item item={item} coin={Number(selectedCoin)} key={index}></Item>
          )):<div>No items Found</div>}
        </StyledItems>
        <div>
          {ItemsPerPage.map((_:any, index:number) => (
            <Button key={index} index={index} onHandleClick={onHandleCurrentPage} currentPage={currentPage}>
              {index + 1}
            </Button>
          ))}
        </div>
    </>
  )
}

export default ItemsShow;