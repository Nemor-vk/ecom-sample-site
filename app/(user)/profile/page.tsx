import { Button } from "@/components/ui/button";
import { getIronSessionDecodedCookie } from "@/lib/ironSession";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Package, ShoppingBag, Star } from "lucide-react";
import { Label } from "@/components/ui/label";
import RecentOrders from "@/components/user/RecentOrders";
import Image from "next/image";
import { findOrdersByUserId, getAllOrders } from "@/prisma/repository/orderRepo";
import { ExtendedOrder } from "@/prisma/extendedModelTypes";
import { CHARGES } from "@/app/constants";
import { calculateDiscountAmount, calculateTotalSavings } from "@/lib/discount-utils";
import { User } from "@/generated/prisma";
import { calculateAge } from "@/lib/utils";
import { IronSessionData } from "iron-session";
import { findUserById } from "@/prisma/repository/userRepo";
import { toast } from "sonner";

const page = async () => {
  const ironSession = await getIronSessionDecodedCookie();
  // console.log("IRON SESSION USER data, /user/profile", ironSession);
  if (!ironSession.isAuthenticated) redirect("/");
  

  const orders = await findOrdersByUserId(ironSession.user!.id);

  return (
    <div className="flex flex-col gap-5">
      {/* <h1>My Profile</h1> */}
      {/* <span>{`You are ${ironSession.isAuthenticated ? 'Logged In' : 'Not Authenticated'}`}</span>
      <Button variant={'outline'} disabled>{ironSession.user?.role}</Button> */}
      <ProfileHeader />
      <PageStats ordersData={orders} />
      <ProfileInfo userId={ironSession.user?.id ?? ''} />
      <RecentOrders recentOrders={orders}/>
    </div>
  );
};

export default page;

// Mock data
const userData = {
  name: "Emma Johnson",
  email: "emma.johnson@email.com",
  age: 28,
  gender: "Female",
  phone: "+1 (555) 123-4567",
  memberSince: "January 2023",
  totalOrders: 24,
  totalSpent: 1247.5,
  totalSavings: 186.25,
  avatar: "/placeholder.svg?height=100&width=100",
}

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    items: 3,
    total: 89.99,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    items: 1,
    total: 45.0,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    items: 2,
    total: 127.5,
    status: "Processing",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const allOrders = [
  ...recentOrders,
  {
    id: "ORD-2023-045",
    date: "2023-12-28",
    items: 4,
    total: 156.75,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "ORD-2023-044",
    date: "2023-12-20",
    items: 2,
    total: 78.99,
    status: "Delivered",
    image: "/placeholder.svg?height=60&width=60",
  },
]

// const ProfileHeader = async() => {

//   const ironSession = await getIronSessionDecodedCookie();

//   return (
//     <div className='rounded-md p-5 flex border-2 gap-6 items-center'>
//       <Image src={envConfig.env.imageKit.url + '/siteImages/dev-avatar.png?updatedAt=1751136574010'} alt='profile'  height={100} width={100} className='aspect-square w-[100px] rounded-full'/>
//       <div className='flex flex-col gap-2'>
//         <h2>{ironSession.user?.name}</h2>
//         {/* <span className='capitalize text-muted-foreground'>valued customer</span> */}
//         <Button variant={'outline'} className='capitalize text-foreground hover:text-foreground cursor-default'>{ironSession.user?.role === SITE_ROLES.AMDIN ? SITE_ROLES.AMDIN : "valued Customer"}</Button>
//       </div>
//     </div>
//   )
// }

const ProfileHeader = async () => {
  const ironSession = await getIronSessionDecodedCookie();

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white">
      <CardContent className="py-8 px-5 flex items-center gap-4">
        <Image src={'/placeholder.svg'} height={100} width={120} alt="profile pic" className="aspect-square rounded-full"/>
        <div className="flex flex-col">
          <h1 className="capitalize text-3xl font-bold mb-2">{`welcome Back, ${ironSession.user?.name} 👋`}</h1>
          <p className="text-pink-100 capitalize">
            Here's what's happening with your account
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const PageStats = async ({ordersData}: {ordersData: ExtendedOrder[]}) => {
  const userData = {
    totalOrders: 10,
    totalSpent: 8000,
    totalSavings: 1200,
  };
  const totalOrders = ordersData.length;
  const totalSpent = ordersData.reduce((acc, order) => acc + parseFloat(order.paymentTotal.toString()), 0).toFixed(2);
  const totalSavings = calculateTotalSavings(ordersData).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {totalOrders}
          </h3>
          <p className="text-gray-600">Total Orders</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            ${totalSpent}
          </h3>
          <p className="text-gray-600">Total Spent</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            ${totalSavings}
          </h3>
          <p className="text-gray-600">Total Savings</p>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileInfo = async ({userId}: {userId:string}) => {

  const userData = await findUserById(userId);

  if (!userData) {
    toast.error("User data not found");
    redirect('/login');
  }

  const age = calculateAge(userData.dateOfBirth);
 

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-6">
      <CardHeader className="flex flex-row items-center justify-between mb-7">
        <CardTitle className="text-xl text-gray-800">
          Personal Information
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-transparent"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-600">Full Name</Label>
            <p className="font-medium text-gray-800">{userData.fullName}</p>
          </div>
          <div>
            <Label className="text-gray-600">Email</Label>
            <p className="font-medium text-gray-800">{userData.email}</p>
          </div>
          <div>
            <Label className="text-gray-600">Phone</Label>
            <p className="font-medium text-gray-800">{userData.mobileNumber}</p>
          </div>
          <div>
            <Label className="text-gray-600">Age</Label>
            <p className="font-medium text-gray-800">
              {age} years old
            </p>
          </div>
          <div>
            <Label className="text-gray-600">Gender</Label>
            <p className="font-medium text-gray-800">{userData.gender}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
