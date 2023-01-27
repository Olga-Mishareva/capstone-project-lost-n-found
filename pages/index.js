import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";

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
            <StyledLink href={`/items/${item.itemId}`}>
              <Item title={item.title} initialStatus={item.initiallyLost} />
            </StyledLink>
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--font-color);
`;
