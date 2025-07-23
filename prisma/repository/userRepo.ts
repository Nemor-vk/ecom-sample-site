import { Gender } from '@/generated/prisma';
import db from '@/lib/prisma';
import { dateSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';


export async function createNeccessaryRolesAndUsers() : Promise<boolean> {

    const adminRole = await db.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: {
          name: 'ADMIN',
        },
      });

        // Hash the default password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create default admin user if not exists
    const adminUser = await db.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            fullName: 'Default Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            dateOfBirth: new Date("1999-09-09"),
            mobileNumber: "9898989898",
            gender: Gender.Male,
            role: {
                connect: { id: adminRole.id },
            },
        },
    });

    console.log('✅ Seeded admin user:', adminUser.email);    
    console.log('✅ ADMIN role ensured');

    const userRole = await db.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: { 
            name: 'USER',
            description : 'The USER role represents any authenticated customer interacting with the platform. This role is assigned by default during signup or account creation.'
        },
    });

    console.log('✅ Seeded Default user:', userRole);    
    console.log('✅ USER role ensured');

    return true
}

export async function findUserByEmailWithPass(userEmail:string) {

    const user = await db.user.findUnique({
        where : {email : userEmail},
        select: {
            id: true,
            fullName:true,
            email: true,
            password: true, // explicitly include it
            role:true,
        },
    })

    return user;
}

export async function findUserByEmail(userEmail:string) {

    const user = await db.user.findUnique({
        where : {email : userEmail},
    })

    return user;
}

export async function findUserById(userId:string) {

    const user = await db.user.findUnique({
        where : {id : userId},
        include : {
            Address:true,
        }
    })

    return user;
}

export async function addNewUser(name:string, email:string, password: string, mobileNumber:string, roleName?:string) {

    const user = await db.user.create({
        data: {
            fullName: name,
            email: email,
            password: password,
            dateOfBirth: new Date("1999-09-09"),
            mobileNumber: "9898989899",
            gender: Gender.Male,
            role: {
                connect: { name: roleName || 'USER' }, // 👈 default role
            },
        }
    })

    return user;
}





