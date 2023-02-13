import styled from "styled-components";

export default function Message({ text, author }) {
  return (
    <div>
      <p>{text}</p>
      <p>{author}</p>
    </div>
  );
}
