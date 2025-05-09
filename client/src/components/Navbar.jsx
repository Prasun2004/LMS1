import { Menu, School } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
   import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
    import DarkMode from "@/DarkMode";
  import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet";
import { Label } from './ui/label';
import { Input } from './ui/input';
   import { Separator } from "@radix-ui/react-dropdown-menu";
  import { Link, useNavigate } from "react-router-dom";
  import { useLogoutUserMutation } from "@/features/api/authApi";
   import { toast } from "sonner";
  import { useSelector } from "react-redux";

export default function Navbar() {
   // const [user,setUser]=useState(true);
    const [logoutUser, {data,isSuccess}] = useLogoutUserMutation();
    const navigate =useNavigate();
     const {user}=useSelector(store =>store.auth); 

    const logouthandler = async()=>{
       await logoutUser();
    }
    console.log(user);
    useEffect(()=>{
       if (isSuccess) {
          console.log(isSuccess);
          toast.success("log out successful");
          navigate("/login");
       }
    },[isSuccess])

  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-index-10'>
       {/* desktop for */}
       <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-2'>
        <School size={"30"}/>
        <Link to='/'>
        <h1 className='hidden md:block font-extrabold text-2xl'>LMS</h1>
        </Link>
       
        </div>
        <div className='flex items-center gap-6'>
           {
            user ? (
                <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Avatar>
      <AvatarImage src={ user.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="my-learing">
            My Learing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="profile">
            Edit Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logouthandler}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {user.role==="instructor" && 
         <DropdownMenuItem>
         Dashboard
       </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
            ) :
            <div className='flex items-center gap-2'>
                <Button variant="outline" onClick={()=>navigate("/Login")}>Login</Button>
                <Button onClick={()=>navigate("/Login")} >SignUp</Button>
            </div>
           }
           <DarkMode/> 
        </div>
       </div>
       {/* mobile */}
       <div className='flex md:hidden items-center justify-between px-4 h-full'>
        <h1 className=''>LMS</h1>
       <MobileNavbar/>
       </div>
      
    </div>
  )
}

const MobileNavbar =()=>{
    const [role,setRole]=useState("instructor")
    return(
        <Sheet>
        <SheetTrigger asChild>
          <Button size='icon' className="rounded-full bg-gray-200 hover-gray-400" variant="outline">
            <Menu/>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle>LMS</SheetTitle>
            <DarkMode/>
          </SheetHeader>
          <Separator className='mr-2'/>
          <nav className='flex flex-col space-y-4'>
            <span>My Learning</span>
            <span>Edit Profile</span>
            <span>Logout</span>
          </nav>
          {
            role=='instructor' && (
                <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">DashBoard</Button>
            </SheetClose>
          </SheetFooter>
            )
          }
          
        </SheetContent>
      </Sheet>
    )
}
