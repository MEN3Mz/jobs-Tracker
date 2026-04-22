import styled from 'styled-components'

const Wrapper = styled.article`
  padding: 1.25rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 2.2rem;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 54px;
    height: 48px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1.5rem;
      color: ${(props) => props.color};
    }
  }
  @media (min-width: 576px) {
    padding: 2rem;
    .count {
      font-size: 50px;
    }
    .icon {
      width: 70px;
      height: 60px;
      svg {
        font-size: 2rem;
      }
    }
  }
`

export default Wrapper
