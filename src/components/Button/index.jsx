import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  color: ${(props) => props.color || "#07f"};
  background-color: ${(props) => props.bgColor || "rgba(0, 119, 255, .1)"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  border: ${(props) => props.border || "2px solid #07f"};
  cursor: pointer;
  outline: none;
  padding: ${(props) => props.padding || "5px 10px"};
  font-size: ${(props) => props.fontSize || "1.08rem"};
  font-weight: ${(props) => props.fontWeight || "700"};
  width: ${(props) => props.width || "auto"};
`;

export const Button = (props) => {
  return <ButtonComponent {...props}>{props.children}</ButtonComponent>;
};
