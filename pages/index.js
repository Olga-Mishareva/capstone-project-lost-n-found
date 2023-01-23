import styled from "styled-components";
import useSWR from "swr";

import Item from "@/components/Item";

export default function HomePage() {
  const { data: items, isLoading, error } = useSWR("/api/items");

  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <StyledList>
      {isLoading ? (
        <li>
          <h2>Loading...</h2>
        </li>
      ) : (
        items.map((item) => (
          <li key={item.itemId}>
            <Item title={item.title} initialStatus={item.initiallyLost} />
          </li>
        ))
      )}
    </StyledList>
  );
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  margin: 0;
  padding: 2em 0;
`;
