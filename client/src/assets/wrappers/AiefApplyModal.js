import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1.5rem;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(16, 42, 67, 0.58);
  }

  .modal {
    position: relative;
    width: min(560px, 100%);
    background: var(--white);
    border-radius: 18px;
    box-shadow: var(--shadow-4);
    padding: 2rem;
  }

  .close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    border: none;
    background: transparent;
    color: var(--grey-500);
    text-transform: capitalize;
    cursor: pointer;
  }

  .eyebrow {
    margin-bottom: 0.5rem;
    color: var(--primary-600);
    font-weight: 700;
  }

  h4 {
    margin-bottom: 0.5rem;
    text-transform: none;
  }

  .company {
    margin-bottom: 1.25rem;
    color: var(--grey-600);
  }

  .details {
    display: grid;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
  }

  .details p {
    margin: 0;
    max-width: none;
    color: var(--grey-700);
    text-transform: none;
  }

  .details span {
    color: var(--grey-900);
    font-weight: 700;
  }

  .details a {
    color: var(--primary-600);
    text-transform: none;
    word-break: break-word;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn-secondary {
    background: var(--grey-800);
  }

  .btn-secondary:hover {
    background: var(--grey-900);
  }
`;

export default Wrapper;
