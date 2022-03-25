import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  height: 80px;
  margin: 0;
  background-color: #103b40;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;

    li {
      font-size: 1.5rem;
      a {
        color: white;
      }
    }
  }
`;
