import Link from "next/link";
import styled from "styled-components";

export default function MyPopup({ item }) {
  return (
    <>
      <ItemTitle>{item.title}</ItemTitle>
      <Category initialStatus={item.initiallyLost} isFound={item.inDiscuss}>
        {item.inDiscuss
          ? "Waiting for pick-up"
          : item.initiallyLost
          ? "Lost"
          : "Found"}
      </Category>
      <StiledLink href={`/items/${item.itemId}`}>
        More details &rarr;
      </StiledLink>
    </>
  );
}

const Category = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ isFound, initialStatus }) =>
    isFound
      ? "var(--finished-color)"
      : initialStatus
      ? "var(--lost-color)"
      : "var(--found-color)"};
`;

const ItemTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  word-break: break-word;
`;

const StiledLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
`;
