import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }).max(255),
  password: z.string().min(1, { message: "Senha obrigatória" }),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Simula chamada à API POST /auth/login
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Usuário dummy: demo@test.com - pula MFA e vai direto para dashboard
      if (data.email === "demo@test.com") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.email);
        
        toast({
          title: "Login realizado!",
          description: "Bem-vindo ao modo demo!",
        });
        
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        toast({
          title: "Login realizado!",
          description: "Redirecionando para verificação MFA...",
        });
        
        setTimeout(() => navigate("/mfa-verify"), 1000);
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "E-mail ou senha incorretos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Bem-vindo de volta" 
      description="Entre com suas credenciais"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          variant="gradient" 
          className="w-full" 
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Não tem uma conta? </span>
          <Button 
            type="button"
            variant="link" 
            className="p-0 h-auto"
            onClick={() => navigate("/register")}
          >
            Criar conta
          </Button>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Demo:</strong> Use <code className="text-primary">demo@test.com</code> com qualquer senha
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
