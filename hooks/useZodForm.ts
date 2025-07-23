import { useForm, UseFormReturn, DefaultValues } from 'react-hook-form';
import { z, ZodType, ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export function useZodForm<T extends ZodType<any, ZodTypeDef, any>>(
  schema: T,
  defaultValues: DefaultValues<z.infer<T>>
): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
}