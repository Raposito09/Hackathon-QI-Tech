import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Shield, Calendar, DollarSign } from "lucide-react";

interface Loan {
  id: number;
  borrower: string;
  amount: number;
  funded: number;
  rate: number;
  term: number;
  purpose: string;
  creditScore: number;
  risk: "low" | "medium" | "high";
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [loans] = useState<Loan[]>([
    {
      id: 1234,
      borrower: "Empresa A",
      amount: 50000,
      funded: 35000,
      rate: 12.5,
      term: 12,
      purpose: "Capital de giro",
      creditScore: 850,
      risk: "low",
    },
    {
      id: 1235,
      borrower: "Empreendedor B",
      amount: 25000,
      funded: 10000,
      rate: 15.0,
      term: 24,
      purpose: "Expansão do negócio",
      creditScore: 720,
      risk: "medium",
    },
    {
      id: 1236,
      borrower: "Startup C",
      amount: 100000,
      funded: 25000,
      rate: 18.5,
      term: 18,
      purpose: "Desenvolvimento de produto",
      creditScore: 680,
      risk: "medium",
    },
    {
      id: 1237,
      borrower: "Pessoa Física D",
      amount: 15000,
      funded: 12000,
      rate: 20.0,
      term: 12,
      purpose: "Educação",
      creditScore: 650,
      risk: "high",
    },
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case "low":
        return "Baixo Risco";
      case "medium":
        return "Médio Risco";
      case "high":
        return "Alto Risco";
      default:
        return risk;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Marketplace de Empréstimos</h1>
            <p className="text-muted-foreground">Invista em empréstimos e ganhe retornos atrativos</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/loan-request")}>
            Solicitar Empréstimo
          </Button>
        </div>

        <div className="grid gap-6">
          {loans.map((loan) => {
            const fundedPercentage = (loan.funded / loan.amount) * 100;
            
            return (
              <Card key={loan.id} className="bg-gradient-card shadow-soft hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {loan.borrower}
                        <Badge variant={getRiskColor(loan.risk) as any}>
                          {getRiskLabel(loan.risk)}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">{loan.purpose}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{loan.rate}%</p>
                      <p className="text-sm text-muted-foreground">ao ano</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Valor Total</p>
                        <p className="font-bold">R$ {loan.amount.toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Prazo</p>
                        <p className="font-bold">{loan.term} meses</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="font-bold">{loan.creditScore}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Financiado</span>
                      <span className="font-medium">
                        R$ {loan.funded.toLocaleString('pt-BR')} / R$ {loan.amount.toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <Progress value={fundedPercentage} className="h-2" />
                    <p className="text-sm text-muted-foreground text-right">
                      {fundedPercentage.toFixed(0)}% financiado
                    </p>
                  </div>

                  <Button 
                    variant="gradient" 
                    className="w-full" 
                    onClick={() => navigate(`/loan/${loan.id}`)}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Ver Detalhes e Investir
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;
