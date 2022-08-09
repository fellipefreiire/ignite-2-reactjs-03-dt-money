import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useTransactions } from '../../../../store/zustand/TransactionsStore'

import { MagnifyingGlass } from 'phosphor-react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import * as S from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

const SearchFormComponent = () => {
  const fetchTransactions = useTransactions((s) => s.fetchTransactions)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
