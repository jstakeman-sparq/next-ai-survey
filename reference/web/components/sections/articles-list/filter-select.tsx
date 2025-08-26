"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type FilterItem = {
  slug?: string
  id?: string
  name: string
}

type Props = {
  items: FilterItem[]
  selectedValues?: string[]
  onSelect?: (value: string) => void
  placeholder?: string
}

export function FilterSelect({
  items,
  selectedValues = [],
  onSelect,
  placeholder = "Select option",
}: Props) {
  const selectedItem =
    selectedValues.length > 0
      ? items.find((item) => {
          const value = item.slug || item.name || item.id || ""
          return selectedValues.includes(value)
        })
      : null

  return (
    <Select
      onValueChange={(value) => onSelect?.(value)}
      value={selectedValues[0] || ""}
    >
      <SelectTrigger className="text-neutral-dark-500 border-none bg-transparent font-bold shadow-none">
        <SelectValue placeholder={placeholder}>
          {selectedItem?.name || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => {
          const value = item.slug || item.name || item.id || ""
          const isSelected = selectedValues.includes(value)
          return (
            <SelectItem
              key={item.id || item.slug}
              value={value}
              className={isSelected ? "bg-blue-50 text-blue-700" : ""}
            >
              <div className="flex w-full items-center justify-between">
                <span>{item.name}</span>
                {/* {isSelected && (
                  <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )} */}
              </div>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
