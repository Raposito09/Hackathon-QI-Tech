import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, QrCode, Copy, CheckCircle } from "lucide-react";

const depositSchema = z.object({
  amount: z.string().min(1, { message: "Digite um valor" }),
});

type DepositForm = z.infer<typeof depositSchema>;

const Deposit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCode] = useState("00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540510.005802BR5925SecureAuth Platform6009SAO PAULO62070503***6304ABCD");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DepositForm>({
    resolver: zodResolver(depositSchema),
  });

  const amount = watch("amount");

  const onSubmit = async (data: DepositForm) => {
    setIsLoading(true);
    try {
      // Simula chamada à API POST /wallets/{id}/pix/charge
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setPixGenerated(true);
      
      toast({
        title: "PIX gerado!",
        description: "Escaneie o QR Code ou copie o código PIX.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PIX",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast({
      title: "Código copiado!",
      description: "Cole no app do seu banco.",
    });
  };

  const simulatePayment = () => {
    toast({
      title: "Pagamento confirmado!",
      description: "Seu saldo foi atualizado.",
    });
    
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fazer Depósito</h1>
          <p className="text-muted-foreground">Adicione fundos à sua carteira via PIX</p>
        </div>

        {!pixGenerated ? (
          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <CardTitle>Valor do Depósito</CardTitle>
              <CardDescription>Digite o valor que deseja depositar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="10"
                    placeholder="1000.00"
                    {...register("amount")}
                    disabled={isLoading}
                    className="text-2xl font-bold"
                  />
                  {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount.message}</p>
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
                      Gerando PIX...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4" />
                      Gerar PIX
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-medium">
              <CardHeader className="text-center">
                <CardTitle>PIX Gerado</CardTitle>
                <CardDescription>
                  Valor: <strong className="text-2xl text-primary">R$ {parseFloat(amount || "0").toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="w-48 h-48 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Código PIX Copia e Cola</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={pixCode} 
                      readOnly 
                      className="font-mono text-xs"
                    />
                    <Button variant="outline" onClick={copyPixCode} className="gap-2">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Abra o app do seu banco, escaneie o QR Code ou cole o código PIX para finalizar o pagamento.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-center text-muted-foreground mb-3">
                    <strong>Modo Demo:</strong> Simule o pagamento para continuar
                  </p>
                  <Button 
                    variant="success" 
                    className="w-full" 
                    size="lg"
                    onClick={simulatePayment}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Simular Pagamento PIX
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" onClick={() => navigate("/dashboard")} className="w-full">
              Voltar à Carteira
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Deposit;
