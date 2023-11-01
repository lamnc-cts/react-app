import styled from 'styled-components'

const BaseButton = styled.button<{ $primary?: boolean }>`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${(props) => (props.$primary ? '#1a1a1a' : 'white')};
  color: ${(props) => (props.$primary ? 'white' : 'black')};
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    background-color: ${(props) => (props.$primary ? 'white' : '#1a1a1a')};
    color: ${(props) => (props.$primary ? 'papayawhip' : 'white')};
  }
  &:disabled {
    pointer-events: none;
  }
`

export default BaseButton
