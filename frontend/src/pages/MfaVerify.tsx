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
import { Loader2, Smartphone } from "lucide-react";

const mfaSchema = z.object({
  code: z.string().length(6, { message: "Código deve ter 6 dígitos" }).regex(/^\d+$/, { message: "Apenas números" }),
});

type MfaForm = z.infer<typeof mfaSchema>;

const MfaVerify = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MfaForm>({
    resolver: zodResolver(mfaSchema),
  });

  const onSubmit = async (data: MfaForm) => {
    setIsLoading(true);
    try {
      // Simula chamada à API POST /auth/mfa/verify
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Verificação concluída!",
        description: "Acesso liberado.",
      });
      
      setTimeout(() => navigate("/kyc/upload"), 1000);
    } catch (error) {
      toast({
        title: "Código inválido",
        description: "Verifique o código e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Verificação MFA" 
      description="Digite o código do seu aplicativo Authenticator"
    >
      <div className="mb-6 p-4 bg-muted rounded-lg flex items-start gap-3">
        <Smartphone className="w-5 h-5 text-primary mt-0.5" />
        <div className="text-sm">
          <p className="font-medium mb-1">Abra seu aplicativo Authenticator</p>
          <p className="text-muted-foreground">
            Insira o código de 6 dígitos gerado pelo aplicativo
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Código de Verificação</Label>
          <Input
            id="code"
            type="text"
            placeholder="000000"
            maxLength={6}
            className="text-center text-2xl tracking-widest font-mono"
            {...register("code")}
            disabled={isLoading}
          />
          {errors.code && (
            <p className="text-sm text-destructive">{errors.code.message}</p>
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
              Verificando...
            </>
          ) : (
            "Verificar Código"
          )}
        </Button>

        <div className="text-center text-sm">
          <Button 
            type="button"
            variant="link" 
            className="p-0 h-auto text-muted-foreground"
            onClick={() => navigate("/login")}
          >
            Voltar ao login
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default MfaVerify;
