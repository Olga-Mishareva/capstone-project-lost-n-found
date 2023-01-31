import styled from "styled-components";

import { StyledLinkButton } from "@/components/StyledLinkButton";
import { StyledSubmitButton } from "@/components/StyledSubmitButton";
import { ButtonsWrapper } from "@/components/ButtonsWrapper";

export default function ItemForm({
  formType,
  title,
  description,
  userName,
  category,
  onSubmit,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    onSubmit(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CategoryWrapper>
        <Label htmlFor="category-select">Category:</Label>
        <Select
          name="initiallyLost"
          id="category-select"
          defaultValue={formType === "add" ? "" : category ? "Lost" : "Found"}
          required
          autoFocus
        >
          <option value="">Choose</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </Select>
      </CategoryWrapper>
      {formType === "add" ? (
        <>
          <Label htmlFor="user-name">User name:</Label>
          <Input
            type="text"
            name="userName"
            id="user-name"
            minLength="2"
            maxLength="20"
            required
          />
        </>
      ) : (
        <UserNameContainer>
          <UserNameLabel id="user-name">User name:</UserNameLabel>
          <UserName aria-labelledby="user-name">{userName}</UserName>
        </UserNameContainer>
      )}

      <Label htmlFor="title">Title of item:</Label>
      <Input
        name="title"
        id="title"
        minLength="2"
        maxLength="30"
        required
        defaultValue={formType === "edit" ? title : ""}
      />
      <Label htmlFor="description">Description:</Label>
      <Textarea
        type="text"
        name="description"
        id="description"
        rows="7"
        minLength="3"
        maxLength="500"
        required
        defaultValue={formType === "edit" ? description : ""}
      />
      <ButtonsWrapper>
        <StyledLinkButton href={"/"} aria-label="cancel" pageType="add-form">
          Cancel
        </StyledLinkButton>
        <StyledSubmitButton type="submit" pageType="add-form">
          Submit
        </StyledSubmitButton>
      </ButtonsWrapper>
    </Form>
  );
}

const Form = styled.form`
  min-width: 18.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 0.5rem;
`;

const Label = styled.label`
  margin: 0;
  padding: 1rem 0 0.5rem;
  font-weight: 500;
`;

const Select = styled.select`
  font-size: 1rem;
  min-width: 7rem;
  border: 1px solid var(--lightgrey-color);
  border-radius: 0.3rem;
  padding: 0.5rem;
  padding-left: 0.2rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;

const Input = styled.input`
  border: 1px solid var(--lightgrey-color);
  border-radius: 0.2rem;
  min-height: 1.8rem;
  padding: 0.5rem;
  font-family: var(--inter-font);
  font-size: 1rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;

const Textarea = styled.textarea`
  border: 1px solid var(--lightgrey-color);
  border-radius: 0.2rem;
  padding: 0.4rem;
  font-family: var(--inter-font);
  font-size: 1rem;
  :focus {
    border: 1px solid var(--found-color);
    background-color: var(--input-color);
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const UserName = styled.p`
  margin: 0;
  font-weight: 600;
`;

const UserNameLabel = styled.span`
  font-weight: 500;
`;
