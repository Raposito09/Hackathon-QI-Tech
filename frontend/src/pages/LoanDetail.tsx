import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Shield, Calendar, DollarSign, TrendingUp, Loader2, ArrowLeft } from "lucide-react";

const fundSchema = z.object({
  amount: z.string().min(1, { message: "Digite um valor" }),
});

type FundForm = z.infer<typeof fundSchema>;

const LoanDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - em produção viria de GET /loans/{id}
  const loan = {
    id: parseInt(id || "1234"),
    borrower: "Empresa A",
    amount: 50000,
    funded: 35000,
    rate: 12.5,
    term: 12,
    purpose: "Capital de giro",
    description: "Empresa consolidada no mercado com 5 anos de atuação. Busca capital de giro para expansão das operações e aquisição de novos equipamentos. Histórico de pagamentos impecável.",
    creditScore: 850,
    risk: "low",
    monthlyPayment: 4500,
    totalReturn: 56250,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FundForm>({
    resolver: zodResolver(fundSchema),
  });

  const fundedPercentage = (loan.funded / loan.amount) * 100;
  const remaining = loan.amount - loan.funded;

  const onSubmit = async (data: FundForm) => {
    setIsLoading(true);
    try {
      // Simula chamada à API POST /loans/{loanId}/fund
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Investimento realizado!",
        description: `Você investiu R$ ${parseFloat(data.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      });
      
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      toast({
        title: "Erro ao investir",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/marketplace")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Marketplace
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{loan.borrower}</CardTitle>
                  <CardDescription className="mt-2">{loan.purpose}</CardDescription>
                </div>
                <Badge variant={loan.risk === "low" ? "success" : "warning"}>
                  Baixo Risco
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Taxa de Retorno</span>
                  <span className="text-2xl font-bold text-primary">{loan.rate}% a.a.</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Valor Total</span>
                  <span className="font-bold">R$ {loan.amount.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Prazo</span>
                  <span className="font-bold">{loan.term} meses</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Score de Crédito</span>
                  <span className="font-bold">{loan.creditScore}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Retorno Total Estimado</span>
                  <span className="font-bold text-success">R$ {loan.totalReturn.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium">{fundedPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={fundedPercentage} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Financiado</span>
                  <span className="font-medium">R$ {loan.funded.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Restante</span>
                  <span className="font-bold text-primary">R$ {remaining.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Realizar Investimento
              </CardTitle>
              <CardDescription>Digite o valor que deseja investir</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor do Investimento (R$)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="100"
                    min="100"
                    max={remaining}
                    placeholder="1000.00"
                    {...register("amount")}
                    disabled={isLoading}
                    className="text-2xl font-bold"
                  />
                  {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount.message}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Valor mínimo: R$ 100,00 • Disponível: R$ {remaining.toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <h4 className="font-medium">Projeção de Retorno</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Investimento</span>
                      <span>R$ 1.000,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa ({loan.rate}% a.a.)</span>
                      <span className="text-success">+ R$ 125,00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total ao final</span>
                      <span className="text-success">R$ 1.125,00</span>
                    </div>
                  </div>
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
                      Processando...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4" />
                      Confirmar Investimento
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sobre o Empréstimo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {loan.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LoanDetail;
