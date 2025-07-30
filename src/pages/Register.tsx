import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { useToast } from "@/hooks/useToast"
import {
  UserPlus
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

type RegisterForm = {
  email: string
  password: string
}

export function Register() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>()

  const onSubmit = async (data: RegisterForm) => {
    console.log('📝 Register form submitted:', data.email);
    
    if (loading) {
      console.log('⏳ Registration already in progress, ignoring duplicate submission');
      return;
    }

    try {
      setLoading(true)
      console.log('🚀 Starting registration process...');
      
      await registerUser(data.email, data.password);
      
      console.log('✅ Registration completed successfully');
      toast({
        title: "Success",
        description: "Account created successfully! Please login.",
      })
      navigate("/login")
    } catch (error) {
      console.error("💥 Register form error:", error.message)
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.message || "Registration failed",
      })
    } finally {
      setLoading(false)
      console.log('🏁 Registration process finished');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Choose a password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-sm text-muted-foreground"
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Already have an account? Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}