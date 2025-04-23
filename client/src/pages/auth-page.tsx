import { useAuth, loginSchema, registerSchema } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();
  
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      isOrganizer: false
    }
  });
  
  // Redirect if user is already logged in (after defining all hooks)
  if (user) {
    navigate("/");
    return null;
  }
  
  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };
  
  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    registerMutation.mutate(data);
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2">नेपाली संस्कृति</h1>
            <p className="text-neutral">Experience authentic Nepali cultural events</p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold font-heading mb-2">Welcome Back</h2>
                  <p className="text-sm text-neutral">Sign in to access your account</p>
                </div>
                
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember" className="text-sm">Remember me</Label>
                      </div>
                      <a href="#" className="text-sm text-primary hover:text-red-700">Forgot password?</a>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-red-700"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            <TabsContent value="register">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold font-heading mb-2">Create Account</h2>
                  <p className="text-sm text-neutral">Join the Nepali cultural community</p>
                </div>
                
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Choose a username"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create a password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="isOrganizer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>I want to organize events</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-red-700"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Hero Image Section */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584146877483-94fec86f1e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-black to-transparent bg-opacity-50">
          <div className="text-white p-12 max-w-md">
            <h2 className="text-4xl font-bold font-heading mb-4">Nepali Cultural Event Registration</h2>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center">
                <div className="mr-3 w-8 h-8 flex items-center justify-center bg-primary bg-opacity-40 rounded-full">
                  <i className="fas fa-check text-white"></i>
                </div>
                <span>Authentic Nepali Wedding Experiences</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 w-8 h-8 flex items-center justify-center bg-primary bg-opacity-40 rounded-full">
                  <i className="fas fa-check text-white"></i>
                </div>
                <span>Traditional Bratabandha Ceremonies</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 w-8 h-8 flex items-center justify-center bg-primary bg-opacity-40 rounded-full">
                  <i className="fas fa-check text-white"></i>
                </div>
                <span>Cultural Pasni Celebrations</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 w-8 h-8 flex items-center justify-center bg-primary bg-opacity-40 rounded-full">
                  <i className="fas fa-check text-white"></i>
                </div>
                <span>Easy Registration & Event Management</span>
              </li>
            </ul>
            <p className="text-sm text-gray-300">Join our community and experience the richness of Nepali cultural traditions. Register for events or create your own to share with others.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
