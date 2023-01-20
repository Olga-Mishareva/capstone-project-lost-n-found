import styled from "styled-components";

import items from "@/db.json";
import Item from "@/components/Item";

export default function HomePage() {
  return (
    <StyledList>
      {items.map((item) => (
        <li key={item.itemId}>
          <Item title={item.itemTitle} initialStatus={item.initiallyLost} />
        </li>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin: 0;
  padding: 30px 0;
`;
