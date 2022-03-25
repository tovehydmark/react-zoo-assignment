import styled, { css } from "styled-components";
interface IButtonProps {
  primary?: boolean;
}

export const Button = styled.button`
  padding: 10px;
  margin: 10px auto 20px;
  background-color: #246065;
  color: white;
  font-size: 1rem;
  border: #084558 2px solid;
  border-radius: 10px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: white;
  }

  :hover {
    background-color: #103b40;
    border: #024f46 2px solid;
  }
  :disabled {
    background-color: grey;
    border: grey;
    color: lightgray;
    cursor: auto;
  }

  ${(props: IButtonProps) =>
    props.primary &&
    css`
      background-color: grey;
    `}
`;
