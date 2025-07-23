'use client'

import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';

const BreadCrumbs = () => {

    const pathname = usePathname();
    const breadCrumbPathnames = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/admin">DashBoard</BreadcrumbLink>
        </BreadcrumbItem> */}
        {breadCrumbPathnames.map((breadCrumbPath) => (
            <div key={breadCrumbPath} className='inline-flex items-center gap-1.5'>
            {breadCrumbPath != 'admin' && <BreadcrumbSeparator className="hidden md:block"/>}
            <BreadcrumbItem className='capitalize'>
                <BreadcrumbLink href={breadCrumbPath}>{breadCrumbPath === 'admin' ? 'DashBoard' : breadCrumbPath}</BreadcrumbLink>
            </BreadcrumbItem>
            </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbs