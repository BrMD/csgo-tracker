"use client";
import styled, { css } from "styled-components";

interface Props {
  variant: String;
}

const StyledHome = styled.div<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.variant === "teste" ? variations.teste : variations.teste2}
`;

const variations = {
  teste: css`
    background-color: #1c4902;
    color: #319cda;
  `,
  teste2: css`
    background-color: #032e470;
    color: #62cf22;
  `,
};

const MainDiv = ({
  variant,
  children,
}: {
  variant: String;
  children: React.ReactNode;
}) => {
  return <StyledHome variant={variant}>{children}</StyledHome>;
};

export default MainDiv;
