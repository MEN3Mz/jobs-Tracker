import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 1rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .source-tag {
    display: inline-block;
    margin-top: 0.4rem;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    background: var(--primary-100);
    color: var(--primary-700);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
  .didnt-yet {
    background: #fcefc7;
    color: #e9b949;
  }
  .submitted,
  .applied {
    background: #dbeafe;
    color: #1d4ed8;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .accepted {
    color: #0f5132;
    background: #d1e7dd;
  }
  .rejected {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 0.9rem 1rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    min-width: 120px;
    padding: 0.35rem 0.75rem;
    height: auto;
    margin-top: 0.5rem;
  }
  .details {
    display: grid;
    gap: 0.65rem;
    margin-top: 1rem;
  }
  .details p {
    margin: 0;
    max-width: none;
    color: var(--grey-700);
    text-transform: none;
    line-height: 1.6;
  }
  .details span {
    color: var(--grey-900);
    font-weight: 700;
  }
  .details a {
    color: var(--primary-600);
    text-transform: none;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    word-break: break-word;
  }
  .description,
  .notes,
  .instructions {
    color: var(--grey-700);
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
  @media (min-width: 576px) {
    header {
      padding: 1rem 1.5rem;
    }
    .main-icon {
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
      margin-right: 2rem;
    }
    .content {
      padding: 1rem 1.5rem;
    }
  }
`;

export default Wrapper;
