import AddressCard from '@/components/AddressCard'
import AddressForm from '@/components/AddressForm'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { getIronSessionDecodedCookie } from '@/lib/ironSession'
import { getAllAddressForUserId } from '@/prisma/repository/addressRepo'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const page = async() => {
  
  const ironSession = await getIronSessionDecodedCookie();
 
  const userAddresses = await getAllAddressForUserId(ironSession.user?.id ?? '');

  return (
    <div className='p-5'>
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm py-8">
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle className="text-2xl text-gray-800 capitalize">Saved Adresses</CardTitle>
              <p className="text-gray-600 capitalize">manage your saved addresses</p>
            </div>
            {/* <Button size={'container'} className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 px-5 py-2.5">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button> */}
            <AddAddressDialogbox/>
          </CardHeader>
          <CardContent className="space-y-4 mt-5">
            {userAddresses && userAddresses.map((address) => (
              <AddressCard key={address.id} userAddress={address} />
            ))}
          </CardContent>
        </Card>
    </div>
  )
}

export default page

const AddAddressDialogbox = () => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'container'} className="rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 px-5 py-2.5">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <AddressForm hideFormButton={false}/> 
      </DialogContent>
    </Dialog>
  );
}