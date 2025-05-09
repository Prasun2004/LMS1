import { Card, CardHeader } from '@/components/ui/card'
import React from 'react'

export default function Dashboard() {
  return (
    <div className=' grid gap-6 grid-cols-1 sm:grid-cls-2 sm:grid-cols-3 lg:grid-cols-4'>
      <Card>
        <CardHeader>
            Totals Sales
        </CardHeader>
      </Card>
    </div>
  )
}
