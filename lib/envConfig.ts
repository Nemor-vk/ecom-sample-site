export const envConfig = {
    env : {
        supabase : {
            subaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL!,
            serviceRoleKey : process.env.SUPBASE_SERVICE_ROLE_KEY!,
            anonKey : process.env.NEXT_PUBLIC_SUPBASE_ANON_KEY!
        },
        imageKit : {
            url : process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
            publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
            privateKey : process.env.IMAGEKIT_PRIVATE_KEY!
        }
    }
}