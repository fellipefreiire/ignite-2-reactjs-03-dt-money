import * as Dialog from '@radix-ui/react-dialog'
import { memo } from 'react'

import logo from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

import * as S from './styles'

export const HeaderComponent = () => {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={logo} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}

export const Header = memo(HeaderComponent)
