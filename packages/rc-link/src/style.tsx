import styled from 'styled-components'

export const SDisabledLink = styled.span`
  &.disabled {
    cursor: not-allowed;

    .link {
      color: #c3c5c6;
      pointer-events: none;
    }
  }
`
