import styled, { StyledComponent } from "styled-components";

export default function Item({ title, initialStatus }) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

const StyledItem = styled.div`
  width: 300px;
  height: 50px;
  background-color: lightblue;
  border-radius: 10px;
`;
