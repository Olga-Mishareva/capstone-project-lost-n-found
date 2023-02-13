import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import Item from "@/components/Item";

const Map = dynamic(() => import("@/components/Map/Map"), { ssr: false });

export default function HomePage({ listView, onPosition, clickPosition }) {
  const { data: session } = useSession();
  const { data: items, isLoading, error } = useSWR("/api/items");

  if (error) {
    return <h2>{JSON.stringify(error)}</h2>;
  }

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {!listView ? (
        <Map
          items={items}
          listView={listView}
          onPosition={onPosition}
          clickPosition={clickPosition}
        />
      ) : (
        <StyledList>
          {items
            .slice() // temporary reverse function!
            .reverse()
            .map((item) => (
              <li key={item.itemId}>
                <ItemLink href={`/items/${item.itemId}`}>
                  <Item
                    title={item.title}
                    initialStatus={item.initiallyLost}
                    isFound={item.inDiscuss}
                  />
                </ItemLink>
              </li>
            ))}
        </StyledList>
      )}
    </>
  );
}

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  margin: 0;
  padding: 1.8rem 1rem 1rem;
  word-break: break-word;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  color: var(--font-color);
`;
