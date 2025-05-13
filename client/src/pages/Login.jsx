import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Login() {
  const [signUpInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [logINInput, setLogInInput] = useState({
    email: "",
    password: "",
  });

  const navigate=useNavigate();
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerLoading,
      isSuccess: registerSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginLoading,
      isSuccess: loginSuccess,
    },
  ] = useLoginUserMutation();
  const changeInput = (e, type) => {
    const { name, value } = e.target;
    if (type === "signUp") {
      setSignUpInput({ ...signUpInput, [name]: value });
    } else {
      setLogInInput({ ...logINInput, [name]: value });
    }
  };

  const handleRegistration =async(e, type)=>{
     const inputData= type ==="signUp" ? signUpInput :logINInput;
     const action =type==="signUp"? registerUser :loginUser;
    
     await action(inputData);
  }

  

  useEffect(()=>{
       console.log(registerSuccess,registerData);
       if (registerSuccess && registerData) {
         toast.success("signup successfully && Please Login");
         navigate("/login");
         setSignUpInput({
           name: "",
           email: "",
           password: "",
         });
       }
       if (loginSuccess && loginData) {
        console.log(loginSuccess,loginData);
         toast.success(loginData?.message || "login successful");
         alert("hi");
         navigate("/");
       }
       if (registerError) {
       // console.log(registerError);
         toast.error(registerData?.data?.message || "signup fail");
       }
       if (loginError) {
       // console.log(loginError);
        toast.error(loginData?.data?.message || "login fail");
       }
  },[loginLoading,registerLoading,loginData,registerData,loginError,registerError]);

  return (
    <div className="flex items-center w-full justify-center align-center mt-16">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">signUp</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>Create an Account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="name"
                  required="true"
                  name="name"
                  value={signUpInput.name}
                  onChange={(e) => changeInput(e, "signUp")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="email"
                  required="true"
                  name="email"
                  value={signUpInput.email}
                  onChange={(e) => changeInput(e, "signUp")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="password"
                  required="true"
                  name="password"
                  value={signUpInput.password}
                  onChange={(e) => changeInput(e, "signUp")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerLoading} onClick={(e) => handleRegistration(e, "signUp")}>
                 {
                  registerLoading ?(
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> please wait
                   </>
                  ):"register"
                 }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to go to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="email"
                  required="true"
                  name="email"
                  value={logINInput.email}
                  onChange={(e) => changeInput(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password"> password</Label>
                <Input
                  type="password"
                  placeholder="password"
                  required="true"
                  name="password"
                  value={logINInput.password}
                  onChange={(e) => changeInput(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginLoading} onClick={(e) => handleRegistration(e, "login")}>
               {
                loginLoading ?(
                  <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin"/> please wait
                  </>
                ) : "Login"
               }  
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
