import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogHeader, DialogTitle } from "../dialog"
import { ScrollArea } from "../scroll-area"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useDialogStateStore } from "@/store/userPreferenceStore"

interface GenericDialogBoxProps {
    children: ReactNode,
    className: string,
    title?: string | null,
}

export const GenericDialogBox = ({title=null, children, className} : GenericDialogBoxProps) => {
    const {isOpen, open, close} = useDialogStateStore()

    return (
        <Dialog open={isOpen} onOpenChange={(open) => (open ? null : close())}>
            <DialogContent className='p-8 h-[74%] bg-muted-gray dark:bg-accent'>
                <ScrollArea className='h-full w-full overflow-y-auto hide-scrollbar'>
                 {title && <DialogHeader>
                    <DialogTitle className='mb-7'>
                        {title}
                    </DialogTitle>
                </DialogHeader>}
                <div className={cn(' flex flex-col gap-5', className)}>
                    {children}
                </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )

}