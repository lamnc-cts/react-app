import classNames from 'classnames'
import { HTMLProps } from 'react'
import styled from 'styled-components'

type TButtonType = 'primary' | 'secondary' | 'tertiary'

interface IButton {
  buttonType?: TButtonType
  className?: HTMLProps<HTMLElement>['className']
}

const getStyles = (buttonType: TButtonType) => {
  buttonType === 'primary' && 'bg-white text-red-200'

  buttonType === 'secondary' && 'bg-red-200 text-white'

  return 'bg-green-200 text-black'
}

const BaseButton = styled.button.attrs<IButton>((props) => ({
  className: classNames(['base-button', props.className, getStyles(props.buttonType || 'primary')])
}))`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.25s;
  cursor: pointer;
  &:disabled {
    pointer-events: none;
  }
`

export default BaseButton
