import styled, { css } from "styled-components";
interface IButtonProps {
  primary?: boolean;
}

export const Button = styled.button`
  padding: 10px;
  background-color: #035773;
  color: white;
  font-size: 1.2rem;
  border: #023d4f 2px solid;
  border-radius: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: #e7b306;
  }

  :hover {
    background-color: #217864;
    border: #024f46 2px solid;
  }

  ${(props: IButtonProps) =>
    props.primary &&
    css`
      background-color: grey;
    `}
`;
