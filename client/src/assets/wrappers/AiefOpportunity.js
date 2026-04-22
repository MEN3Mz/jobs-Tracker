import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  width: 100%;
  min-width: 0;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
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

  .info h5 {
    margin-bottom: 0.25rem;
    letter-spacing: 0;
    text-transform: none;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .info p {
    margin: 0;
    color: var(--grey-500);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .content {
    padding: 1rem;
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .meta {
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .meta p,
  .how-to-apply {
    margin: 0;
    color: var(--grey-600);
    line-height: 1.6;
    text-transform: none;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .meta span {
    font-weight: 600;
    color: var(--grey-900);
  }

  .meta a,
  .how-to-apply a {
    color: var(--primary-600);
    text-transform: none;
    word-break: break-word;
    overflow-wrap: anywhere;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .description {
    color: var(--grey-700);
    line-height: 1.7;
    margin-bottom: 1rem;
    text-transform: none;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .how-to-apply {
    margin-top: 1rem;
  }

  .how-to-apply span {
    font-weight: 600;
    color: var(--grey-900);
  }

  footer {
    display: grid;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  .apply-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-track,
  .apply-btn {
    width: 100%;
    justify-content: center;
  }

  .btn-track {
    background: var(--grey-800);
  }

  .btn-track:hover {
    background: var(--grey-900);
  }

  @media (min-width: 576px) {
    header {
      padding: 1rem 1.5rem;
    }
    .main-icon {
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
    }
    .content {
      padding: 1.25rem 1.5rem;
    }
    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .btn-track,
    .apply-btn {
      width: auto;
    }
  }

  @media (min-width: 576px) {
    .content-center {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export default Wrapper;
