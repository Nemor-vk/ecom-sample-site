import { ArrowLeft, MapPinCheck, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import AddressForm from "../AddressForm";
import { toast } from "sonner";
import { useDialogStateStore } from "@/store/userPreferenceStore";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

export const AddressDialogBox = () => {
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

            close()
        } catch (error) {
            console.log("error: ", error);
            toast.error("Failed To Update Address!");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => (open ? null : close())}>
            <DialogContent className='p-8 h-[74%] bg-muted-gray dark:bg-accent'>
                <ScrollArea className='h-full w-full overflow-y-auto hide-scrollbar'>
                <div className=' flex flex-col gap-5'>
                    <AddressForm ref={childRef} hideFormButton={true}/>

                    {/* NEW Address button */}
                    <Button variant={'outline'} className='text-blue-400 border-blue-200 dark:border-accent my-2 hover:bg-background/30 dark:hover:text-yellow-200 py-6 text-sm lg:text-base' onClick={() => handleExternalSubmit()}>
                        <MapPinCheck/>
                        Save New Address
                    </Button>
                </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )

}