import styled from 'styled-components'

const Wrapper = styled.main`
  .logo-landing {
    width: min(260px, 58vw);
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 10px 24px rgba(29, 78, 216, 0.14));
    margin: 0 auto 1.5rem;
  }
  .page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
  }
  .info {
    max-width: 680px;
    text-align: center;
  }
  h1 {
    font-weight: 700;
    text-transform: none;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 992px) {
    .logo-landing {
      width: 280px;
    }
  }
`
export default Wrapper
