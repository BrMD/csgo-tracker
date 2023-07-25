import styled from "styled-components"

const StyledButton = styled.button`
    margin: 10px;
    height: 40px;
    width: 40px;
    
    cursor:pointer;
    border:none;
    border-radius: 40px;
`

interface propsReceived{
    index:Number,
    onHandleClick:Function,
    children: React.ReactNode,
    currentPage:Number
}


const Button:React.FC<propsReceived> = ({index, onHandleClick, children,currentPage}) => {
    console.log(index)
  return (
    <StyledButton className={`${currentPage === index ? "activeButton": ""}`} onClick={() => onHandleClick(index)}>{children}</StyledButton>
  )
}

export default Button