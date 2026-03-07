import { STATUS_CODES } from "@/app/constants/errorConstants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const generateBase36Id = () => {
  const timestamp = Date.now();
  return `X${timestamp.toString(36).toUpperCase()}`;
};

export const generateUniqueInvoiceNumber = () => {
  // const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  const prefix = "ORD";
  return `${prefix}-${generateBase36Id()}`;
};

export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  const age = today.getFullYear() - birthDate.getFullYear();
  // const hasHadBirthdayThisYear =
  //   today.getMonth() > birthDate.getMonth() ||
  //   (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  // if (!hasHadBirthdayThisYear) {
  //   age--;
  // }

  return age;
}


export function formatCurrencyToINR(price: number) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return formatted;
}

export function getStatusMessage(code: number): string {
  const statusMap: Record<STATUS_CODES, string> = {
    [STATUS_CODES.INTERNAL]: 'INTERNAL',
    [STATUS_CODES.NOT_FOUND]: 'NOT_FOUND',
    [STATUS_CODES.FORBIDDEN]: 'FORBIDDEN',
    [STATUS_CODES.CONFLICT]: 'CONFLICT',
    [STATUS_CODES.SUCCESS]: 'SUCCESS',
  };

  return statusMap[code as STATUS_CODES] || 'UNKNOWN_STATUS';
}


