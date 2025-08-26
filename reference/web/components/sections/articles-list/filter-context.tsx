"use client"

import { createContext, useContext } from "react"

interface FilterContextType {
  isPending: boolean
}

const FilterContext = createContext<FilterContextType>({ isPending: false })

export function FilterProvider({ 
  children, 
  isPending 
}: { 
  children: React.ReactNode
  isPending: boolean 
}) {
  return (
    <FilterContext.Provider value={{ isPending }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  return useContext(FilterContext)
}