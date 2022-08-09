import { useEffect } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { useTransactions } from '../../store/zustand/TransactionsStore'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import * as S from './styles'

export const Transactions = () => {
  const transactions = useTransactions((s) => s.transactions)
  const fetchTransactions = useTransactions((s) => s.fetchTransactions)

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <div>
      <Header />
      <Summary />

      <S.TransactionsContainer>
        <SearchForm />
        <S.TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <S.PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </S.PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </S.TransactionsTable>
      </S.TransactionsContainer>
    </div>
  )
}
