'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Users, 
  Package, 
  History, 
  FileText, 
  BarChart3,
  LayoutDashboard
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Sellers', href: '/sellers', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Product History', href: '/product-history', icon: History },
  { name: 'Scan Logs', href: '/scan-logs', icon: FileText },
  { name: 'Seller Metrics', href: '/metrics', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-16 md:w-64 flex-col border-r bg-background transition-all duration-200">
      <div className="flex h-16 items-center justify-center md:justify-start border-b px-2 md:px-6">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
          <h1 className="text-lg font-semibold hidden md:block">Dashboard</h1>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2 md:px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-3 py-2 md:py-2 text-xs md:text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
              title={item.name}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-[10px] md:text-sm leading-tight text-center md:text-left">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

