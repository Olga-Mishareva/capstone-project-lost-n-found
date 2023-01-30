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
    <>
      <AddItemLink href="/create">
        <StyledLinkTitle>Add item</StyledLinkTitle>
      </AddItemLink>
      <StyledList>
        {isLoading ? (
          <li>
            <h2>Loading...</h2>
          </li>
        ) : (
          items
            .slice() // temporary reverse function!
            .reverse()
            .map((item) => (
              <li key={item.itemId}>
                <ItemLink href={`/items/${item.itemId}`}>
                  <Item title={item.title} initialStatus={item.initiallyLost} />
                </ItemLink>
              </li>
            ))
        )}
      </StyledList>
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  margin: 0;
  padding: 2em 0;
  word-break: break-word;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: var(--font-color);
`;

const AddItemLink = styled(ItemLink)`
  margin-top: 2em;
  min-width: 18em;
  min-height: 3em;
  border: 3px solid var(--lightgrey-color);
  border-radius: 0.7em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLinkTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
`;
