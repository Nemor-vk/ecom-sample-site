'use client'

import { Ellipsis, Home } from 'lucide-react'
import React from 'react'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Address } from '@/generated/prisma'
import { useDialogStateStore, useUserPreferenceStore } from '@/store/userPreferenceStore'

const AddressCard = ({userAddress}:{userAddress:Address}) => {

    const {selectedAddressId, setSelectedAddressId} = useUserPreferenceStore();
    const {close} = useDialogStateStore();

    const addressLine = [userAddress.primaryAddress, userAddress.streetAddress, userAddress.landmark, userAddress.city, userAddress.state]
  .filter(Boolean)
  .join(', ') + " - " + userAddress.pincode;

  const onClickSelect = () => {setSelectedAddressId(userAddress.id); console.log(selectedAddressId) ; close()}

   return (
    <Card className='border-2 cursor-pointer mx-2 hover:scale-102 hover:border-gray-700 active:border-blue-300 transition-colors duration-200' onClick={onClickSelect}>
        <CardContent className='flex text-base items-start justify gap-4 p-4 rounded-xl'>
            <div className='aspect-square bg-accent/30 rounded-md h-[55px] flex justify-center items-center'>
                <Home size={20}/>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='font-bold text-base flex gap-2'>
                    <Badge className='rounded-md bg-red-400/80 dark:bg-blue-200 font-semibold dark:text-background px-2 py-0 text-sm'>{userAddress.labelPreset != 'Others' ? userAddress.labelPreset : userAddress.customLabel }</Badge>
                    <span className='capitalize'>{userAddress.recipientName || 'Vivek Chauhan'}</span>
                </label>
                <p className='text-muted-foreground text-sm line-clamp-2 capitalize'>{addressLine}</p>
                <div className='text-muted-foreground text-sm'>
                    <span>{`Phone number : ${userAddress.phoneNumber}`}</span>
                </div>
            </div>
            <div className='ml-auto'>
                <Ellipsis/>
            </div>
        </CardContent>
    </Card>
    )
}

export default AddressCard