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

  let age = today.getFullYear() - birthDate.getFullYear();
  // const hasHadBirthdayThisYear =
  //   today.getMonth() > birthDate.getMonth() ||
  //   (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  // if (!hasHadBirthdayThisYear) {
  //   age--;
  // }

  return age;
}
