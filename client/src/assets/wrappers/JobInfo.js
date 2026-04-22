import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  min-width: 0;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    min-width: 0;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
`
export default Wrapper
