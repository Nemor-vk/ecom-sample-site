import React, { useEffect, useRef, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ArrowLeft, ChevronLeft, ChevronRight, Circle, Edit, Ellipsis, Home, MapPinCheck, NotebookTabs, Plus, SquarePen, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddressForm from './AddressForm'
import { Separator } from './ui/separator'
import { ScrollArea } from './ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import AddressCard from './AddressCard'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { getIronSessionDecodedCookie } from '@/lib/ironSession'
import { redirect } from 'next/navigation'
import { Address } from '@/generated/prisma'
import { useDialogStateStore, useUserPreferenceStore } from '@/store/userPreferenceStore'

const AddressPage = () => {

    // const [isOpen, setIsOpen] = useState(false)
    const {open, close} = useDialogStateStore()
    const {data:authSession} = useSession();
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const {selectedAddressId, setSelectedAddressId} = useUserPreferenceStore();

    if (!authSession?.user) {
        toast.warning("User Error: Please login first!");

        setTimeout(() => {
            redirect('/');
        }, 2000); // Wait 2 seconds before redirecting
    }

    useEffect(() => {
      const fetchAddresses = async () => {
        try {
          const response = await fetch(
            `/api/address?userId=${authSession?.user?.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const resultJson= await response.json();
          const allAddresses:Address[] = resultJson.address;

          if (!response.ok) {
            console.log("Failed to get all Address:", resultJson.error);
            return;
          }

          //Setting Default Address Id if not set
          if(!selectedAddressId) {
            setSelectedAddressId(allAddresses[0].id)
          }
          const address = allAddresses.find((addr) => addr.id === selectedAddressId) ?? null;
          console.log("selected address id: ", selectedAddressId)
          console.log(`Selected Address, `, address)
          setSelectedAddress(address); //SET SELECTED ADDRESS FOR UI
          // Proceed with using userAddresses
        } catch (error) {
          console.log("Something went wrong fetching addresses:", error);
        }
      };

      fetchAddresses();
    }, [selectedAddressId]);

  return (
    <div className='my-5'>
        <h2>Delivery Address</h2>

        { selectedAddress && 
        <div className='bg-background rounded-md p-5 pb-2 mt-2.5 flex items-start pt-8 flex-col'>
            <div className='flex mb-1.5'>
                <span className='font-light text-muted-foreground'>Delivering To&nbsp;</span>
                <div className='font-bold flex gap-2'>
                    <span>{selectedAddress.recipientName}</span>
                    <Badge className='rounded-md bg-blue-400 font-semibold px-2 py-0 capitalize'>{selectedAddress.labelPreset === 'Others' ? selectedAddress.customLabel : selectedAddress.labelPreset}</Badge>
                </div>
            </div>
            <p className='text-muted-foreground'>
                {
                [selectedAddress.primaryAddress, selectedAddress.streetAddress, selectedAddress.landmark, selectedAddress.city, selectedAddress.state]
                    .filter(Boolean)
                    .join(', ') + " - " + selectedAddress.pincode
                }
            </p>
            <Button variant={'link'} className='px-0 mt-1 dark:text-orange-300 hover:dark:text-orange-200'
             onClick={open}>
                Change Address
                <ChevronRight/>
                {/* <SquarePen/> */}
            </Button>
        </div>
        }
        <AddressDialogBox/>
    </div>
  )
}

export default AddressPage


const AddressDialogBox = () => {

    type ADDRESS_PAGE_Mode = 'Default' | 'Add' | 'Update';
    const [addressFormMode, setAddressFormMode] = useState<ADDRESS_PAGE_Mode>('Default');
    const {data:authSession} = useSession();
    
     const childRef = useRef<{ handleSubmit: () => void }>(null);
     const {isOpen, open, close} = useDialogStateStore()

     //ADDRESSS_FORM SUBMIT HANDLER
     const handleExternalSubmit = async () => {
        try {
            const values = await childRef.current?.handleSubmit();
            console.log("Form submitted successfully:",  values);

            const response = await fetch(`/api/address?userId=${authSession?.user?.id}`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Server responded with an error.");
            }

            toast.success("New Address Added Successfully");
            console.log("Address form response:", await response.json());

            setTimeout(() => {
                setAddressFormMode('Default');
                console.log("form", addressFormMode);
            }, 2000); // 1-second delay
        } catch (error) {
            console.log("error: ", error);
            toast.error("Failed To Update Address!");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => (open ? null : close())}>
            <DialogContent className='p-8 h-[74%] bg-muted-gray dark:bg-accent'>
                <ScrollArea className='h-full w-full overflow-y-auto hide-scrollbar'>
                 <DialogHeader>
                    <DialogTitle className='mb-7'>
                        {addressFormMode === 'Add'
                        ? <span className=' hover:border-black hover:border-b-1 w-fit flex items-center' onClick={() => setAddressFormMode('Default')}><ArrowLeft className='mr-1.5'/>{'Add New Address'}</span>
                        : 'Select Address'}
                    </DialogTitle>
                </DialogHeader>
                <div className=' flex flex-col gap-5'>

                    { addressFormMode === 'Add'
                        ? <AddressForm ref={childRef} hideFormButton={true}/>
                        : <SavedAddresses/>
                    }

                    {/* NEW Address button */}
                    <Button variant={'outline'} className='text-blue-400 border-blue-200 dark:border-accent my-2 hover:bg-background/30 dark:hover:text-yellow-200 py-6 text-sm lg:text-base' onClick={() => addressFormMode === 'Add' ? handleExternalSubmit() : setAddressFormMode('Add')}>
                        { addressFormMode === 'Add' && 
                        <>
                            <MapPinCheck/>
                            Save New Address
                        </>
                        }
                        { addressFormMode === 'Default' && 
                        <>
                            <Plus/>
                            Add New Address
                        </>
                        }
                    </Button>
                </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

const SavedAddresses = () => {

    
    const {data:authSession} = useSession();
    const [userAddresses, setUserAddresses] = useState<Address[]>([])

    if (!authSession?.user) {
        toast.warning("User Error: Please login first!");

        setTimeout(() => {
            redirect('/');
        }, 2000); // Wait 2 seconds before redirecting
    }

    useEffect(() => {
      const fetchAddresses = async () => {
        try {
          const response = await fetch(
            `/api/address?userId=${authSession?.user?.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const resultJson = await response.json();

          if (!response.ok) {
            console.log("Failed to get all Address:", resultJson.error);
            return;
          }

          setUserAddresses(resultJson.address || []);
          console.log(`User Addresses for ${authSession?.user?.name}, `, resultJson.address)
          // Proceed with using userAddresses
        } catch (error) {
          console.log("Something went wrong fetching addresses:", error);
        }
      };

      fetchAddresses();
    }, []);

    return (
        <>
            {userAddresses && userAddresses.map((userAddress) => (
                <AddressCard key={userAddress.id} userAddress={userAddress}/>
            ))}

            {/* Seperator */}
            <div className='flex relative my-4'>
                <Separator className='border-2'/>
                <div className='absolute font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-muted-gray dark:bg-accent p-1 text-foreground/80'>OR</div>
            </div>
        </>
    )
}
