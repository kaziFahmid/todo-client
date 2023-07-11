import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useTodos() {
    const{refetch,data:todos=[]}= useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
          const res = await fetch(` https://todo-server-indol.vercel.app/todos`)

          return res.json()
        },
      })


  return [refetch,todos]
}
