"use client"

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { addressSchema } from '@/lib/validations'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { INDIAN_CITIES_BY_STATE, INDIAN_STATES, IndianCities, IndianStates } from '@/app/constants'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { AddressLabelPreset } from '@/generated/prisma'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import { getIronSessionDecodedCookie } from '@/lib/ironSession'
import { Plus } from 'lucide-react'

type AddressFormProps = {
  initialValues?: Partial<z.infer<typeof addressSchema>>;
  onSubmit?: (data: z.infer<typeof addressSchema>) => void;
  hideFormButton:boolean;
};
 
const AddressForm = forwardRef(({ initialValues, onSubmit, hideFormButton }: AddressFormProps, ref) => {

  // 1. Define your form.
 const form = useForm<z.infer<typeof addressSchema>>({
  resolver: zodResolver(addressSchema),
  defaultValues: {
    recipientName: "",
    labelPreset: "Home",
    customLabel: "",
    primaryAddress: "",
    streetAddress: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
    ...initialValues, // override with passed-in values
  },
});

 useImperativeHandle(ref, () => ({
  handleSubmit: () => {
    return new Promise((resolve, reject) => {
      form.handleSubmit((data) => {
        resolve(data); // resolves with valid form data
        setTimeout(() => {
          form.reset({ ...initialValues })
        }, 1000);
      }, (errors) => {
        reject(errors); // optional: reject with validation errors
      })();
    });
  },
}));

  const addressTypes:AddressLabelPreset[] = ['Home', 'Work', 'Hotel','Others']
  const labelPreset = useWatch({
    control: form.control,
    name: "labelPreset",
  });

  const selectedState = useWatch({
    control: form.control,
    name: "state",
  });

  // reset logic
  // useEffect(() => {
  //   form.reset({ ...defaultValues, ...initialValues });
  // }, [initialValues]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8 pt-1 px-1">
        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter First And Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House No./ Building Name/ Apartment</FormLabel>
              <FormControl>
                <Input
                  placeholder="House No./ Building Name/ Apartment/ Company"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area/ Sector/ Locality</FormLabel>
              <FormControl>
                <Input placeholder="Area/ Sector/ Locality" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className=" text-sm text-start form-select px-2 py-1 border-2 rounded-md w-full">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="text-sm border-2">
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger className=" text-sm text-start form-select px-2 py-1 border-2 rounded-md w-full">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="text-sm border-2">
                      {INDIAN_CITIES_BY_STATE[selectedState]?.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input placeholder="Enter Landmark (optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Pincode"
                  type="number"
                  {...field}
                  required
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Mobile Number"
                  type="tel"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="labelPreset"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Save address as</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={(value) => {
                    if (value) {
                      field.onChange(value);
                    }
                  }}
                  className="flex gap-1"
                >
                  {addressTypes.map((addressLabel) => (
                    <ToggleGroupItem
                      key={addressLabel}
                      value={addressLabel}
                      className="rounded-lg px-4 dark:data-[state=on]:bg-card/50"
                    >
                      {addressLabel}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {labelPreset === "Others" && (
          <FormField
            control={form.control}
            name="customLabel"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Custom Label</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Address Label" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        { !hideFormButton &&
        <Button
        type='submit'
        variant={"outline"}
        className="text-blue-400 border-blue-200 dark:border-accent my-2 hover:bg-background/30 dark:hover:text-yellow-200 py-6 text-sm lg:text-base"
        >
          <Plus />
          Add New Address
        </Button>
        }

      </form>
    </Form>
  );
});

AddressForm.displayName = "AddressForm";

export default AddressForm


//IS CALLED THROUGH FORM BTN - UseImperative & ref don't call this - INTERNAL
const onFormSubmit = async(values: z.infer<typeof addressSchema>) => {

  const ironSession = await getIronSessionDecodedCookie();

   try {
     console.log("Form submitted successfully:", values);

     const response = await fetch(
       `/api/address?userId=${ironSession?.user?.id}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(values),
       }
     );

     if (!response.ok) {
       throw new Error("Server responded with an error.");
     }
     toast.success("New Address Added Successfully");
     console.log("Address form response:", await response.json());

     setTimeout(() => {}, 2000); // 1-second delay
   } catch (error) {
     console.error("error: ", error);
     toast.error("Failed To Update Address!");
   }
}