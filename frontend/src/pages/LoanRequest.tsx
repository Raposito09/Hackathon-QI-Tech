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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText, ArrowLeft } from "lucide-react";

const loanRequestSchema = z.object({
  amount: z.string().min(1, { message: "Digite um valor" }),
  term: z.string().min(1, { message: "Selecione o prazo" }),
  purpose: z.string().min(10, { message: "Descreva o motivo (mínimo 10 caracteres)" }).max(500),
});

type LoanRequestForm = z.infer<typeof loanRequestSchema>;

const LoanRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoanRequestForm>({
    resolver: zodResolver(loanRequestSchema),
  });

  const onSubmit = async (data: LoanRequestForm) => {
    setIsLoading(true);
    try {
      // Simula chamada à API POST /loans
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Solicitação enviada!",
        description: "Sua solicitação está em análise.",
      });
      
      setTimeout(() => navigate("/marketplace"), 2000);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        <div>
          <h1 className="text-3xl font-bold mb-2">Solicitar Empréstimo</h1>
          <p className="text-muted-foreground">Preencha os detalhes da sua solicitação</p>
        </div>

        <Card className="bg-gradient-card shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Detalhes do Empréstimo
            </CardTitle>
            <CardDescription>
              Informe o valor, prazo e finalidade do empréstimo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor Solicitado (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="100"
                  min="1000"
                  max="500000"
                  placeholder="50000.00"
                  {...register("amount")}
                  disabled={isLoading}
                  className="text-xl font-bold"
                />
                {errors.amount && (
                  <p className="text-sm text-destructive">{errors.amount.message}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Valor entre R$ 1.000,00 e R$ 500.000,00
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Prazo de Pagamento</Label>
                <Select onValueChange={(value) => setValue("term", value)}>
                  <SelectTrigger id="term" disabled={isLoading}>
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="18">18 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                  </SelectContent>
                </Select>
                {errors.term && (
                  <p className="text-sm text-destructive">{errors.term.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Finalidade do Empréstimo</Label>
                <Textarea
                  id="purpose"
                  placeholder="Descreva como você pretende usar o empréstimo. Seja claro e específico para aumentar suas chances de aprovação."
                  {...register("purpose")}
                  disabled={isLoading}
                  rows={5}
                />
                {errors.purpose && (
                  <p className="text-sm text-destructive">{errors.purpose.message}</p>
                )}
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Informações Importantes</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Sua solicitação será analisada em até 48 horas</li>
                  <li>A taxa de juros será calculada com base no seu score de crédito</li>
                  <li>Após aprovação, seu empréstimo ficará disponível no marketplace</li>
                  <li>Você receberá os fundos assim que o empréstimo for totalmente financiado</li>
                </ul>
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
                    Enviando solicitação...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    Enviar Solicitação
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LoanRequest;
