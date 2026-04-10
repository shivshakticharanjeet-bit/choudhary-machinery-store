import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/src/lib/storeService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authService.login(password)) {
      toast.success("Login successful");
      navigate("/admin");
    } else {
      toast.error("Invalid password. Try 'admin123'");
    }
  };

  return (
    <div className="container mx-auto px-4 h-[70vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your password to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-xs text-center text-muted-foreground">
              Hint: Use <span className="font-mono font-bold">admin123</span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
