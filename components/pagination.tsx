'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <div className="flex items-center gap-2">
        <Label htmlFor="items-per-page" className="text-sm">
          Items per page:
        </Label>
        <Input
          id="items-per-page"
          type="number"
          min="1"
          max="100"
          value={itemsPerPage}
          onChange={(e) => {
            const value = Math.min(100, Math.max(1, parseInt(e.target.value) || 10))
            onItemsPerPageChange(value)
          }}
          className="w-20"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

