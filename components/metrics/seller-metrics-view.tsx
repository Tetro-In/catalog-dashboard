'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { ViewToggle } from '@/components/view-toggle'
import { DataTable } from '@/components/data-table'
import { CardGrid } from '@/components/card-grid'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Pagination } from '@/components/pagination'
import { useSearchPagination } from '@/hooks/use-search-pagination'

type SellerMetric = {
  seller_phone: string
  seller_name: string | null
  city: string | null
  total_listings_history: bigint
  current_active_listings: bigint
  catalog_quality_score: number
  avg_listings_recent: number | null
  last_scan_date: Date | null
}

interface SellerMetricsViewProps {
  metrics: SellerMetric[]
}

export function SellerMetricsView({ metrics }: SellerMetricsViewProps) {
  const [view, setView] = useState<'table' | 'cards'>('table')

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    filteredData,
    handlePageChange,
    handleItemsPerPageChange,
  } = useSearchPagination(
    metrics,
    (metric) => [
      metric.seller_phone,
      metric.seller_name || '',
      metric.city || '',
      metric.total_listings_history.toString(),
      metric.current_active_listings.toString(),
      metric.catalog_quality_score.toString(),
    ],
    10
  )

  const tableColumns = [
    {
      key: 'seller',
      header: 'Seller',
      render: (metric: SellerMetric) => metric.seller_name || metric.seller_phone,
    },
    {
      key: 'city',
      header: 'City',
      render: (metric: SellerMetric) => metric.city || '-',
    },
    {
      key: 'activeListings',
      header: 'Active Listings',
      render: (metric: SellerMetric) => Number(metric.current_active_listings),
    },
    {
      key: 'totalHistory',
      header: 'Total History',
      render: (metric: SellerMetric) => Number(metric.total_listings_history),
    },
    {
      key: 'qualityScore',
      header: 'Quality Score',
      render: (metric: SellerMetric) => (
        <Badge variant={metric.catalog_quality_score >= 80 ? 'default' : 'secondary'}>
          {metric.catalog_quality_score.toFixed(1)}%
        </Badge>
      ),
    },
    {
      key: 'avgRecent',
      header: 'Avg Recent',
      render: (metric: SellerMetric) =>
        metric.avg_listings_recent ? metric.avg_listings_recent.toFixed(1) : '-',
    },
    {
      key: 'lastScan',
      header: 'Last Scan',
      render: (metric: SellerMetric) =>
        metric.last_scan_date ? new Date(metric.last_scan_date).toLocaleDateString() : '-',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Seller Metrics"
          description="View aggregated seller performance metrics"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredData.length}
          totalCount={metrics.length}
        />
        <ViewToggle value={view} onValueChange={setView} />
      </div>

      {view === 'table' ? (
        <>
          <DataTable data={paginatedData} columns={tableColumns} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      ) : (
        <>
          <CardGrid
            data={paginatedData}
            renderCard={(metric: SellerMetric) => (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {metric.seller_name || metric.seller_phone}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {metric.city && (
                    <div>
                      <span className="text-sm text-muted-foreground">City:</span>
                      <p className="font-medium">{metric.city}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Active</span>
                      <p className="text-lg font-semibold">{Number(metric.current_active_listings)}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Total History</span>
                      <p className="text-lg font-semibold">{Number(metric.total_listings_history)}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Quality Score:</span>
                    <Badge variant={metric.catalog_quality_score >= 80 ? 'default' : 'secondary'} className="mt-1">
                      {metric.catalog_quality_score.toFixed(1)}%
                    </Badge>
                  </div>
                  {metric.avg_listings_recent && (
                    <div>
                      <span className="text-xs text-muted-foreground">Avg Recent:</span>
                      <p className="font-medium">{metric.avg_listings_recent.toFixed(1)}</p>
                    </div>
                  )}
                  {metric.last_scan_date && (
                    <div className="text-xs text-muted-foreground pt-2">
                      Last scan: {new Date(metric.last_scan_date).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  )
}

