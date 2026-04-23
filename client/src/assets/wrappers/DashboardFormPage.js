import styled from 'styled-components'

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 1.75rem 1rem 2.25rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .edit-job-reference {
    grid-column: 1 / -1;
    background: var(--grey-50);
    border: 1px solid var(--grey-100);
    border-radius: var(--borderRadius);
    padding: 0.85rem 1rem;
    margin-bottom: 0.25rem;
  }
  .edit-job-reference p {
    margin: 0;
    color: var(--grey-700);
    text-transform: none;
    line-height: 1.6;
  }
  .edit-job-reference p + p {
    margin-top: 0.35rem;
  }
  .edit-job-reference span {
    color: var(--grey-900);
    font-weight: 700;
  }
  .form-row-textarea {
    grid-column: 1 / -1;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .profile-save-btn {
    grid-column: 1 / -1;
    justify-self: center;
    width: min(100%, 16rem);
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 576px) {
    padding: 2.5rem 1.5rem 3rem;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`

export default Wrapper
