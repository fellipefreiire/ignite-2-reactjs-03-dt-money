import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { api } from '../../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

interface TransactionsStore {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const useTransactions = create<TransactionsStore>()(
  immer((set, get) => ({
    transactions: [],
    fetchTransactions: async (query?: string) => {
      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        },
      })
      set({ transactions: response.data })
    },
    createTransaction: async (data: CreateTransactionInput) => {
      const response = await api.post('transactions', {
        ...data,
        createdAt: new Date(),
      })

      const transactions = get().transactions
      set({ transactions: [response.data, ...transactions] })
    },
  })),
)
