import styled from "styled-components";
import Link from "next/link";

export default function ItemDetails({
  title,
  description,
  initialStatus,
  isFound,
}) {
  return (
    <div>
      <div>
        <h2>{initialStatus ? "Lost" : "Found"}</h2>
        <Link href="/">Go back</Link>
      </div>
      <p>Name of owner</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button">
        {isFound
          ? "Found its owner"
          : initialStatus
          ? "I found it"
          : "That's mine"}
      </button>
    </div>
  );
  666;
}
