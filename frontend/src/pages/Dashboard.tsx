import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState({
    available: 15000.50,
    reserved: 8500.00,
    total: 23500.50,
  });

  const [transactions] = useState([
    { id: 1, type: "deposit", amount: 1000, date: "2025-01-10", description: "Depósito PIX" },
    { id: 2, type: "investment", amount: -500, date: "2025-01-09", description: "Investimento Empréstimo #1234" },
    { id: 3, type: "return", amount: 525, date: "2025-01-08", description: "Retorno Empréstimo #1200" },
    { id: 4, type: "deposit", amount: 5000, date: "2025-01-05", description: "Depósito PIX" },
  ]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Minha Carteira</h1>
            <p className="text-muted-foreground">Gerencie seus fundos e investimentos</p>
          </div>
          <Button variant="gradient" size="lg" onClick={() => navigate("/deposit")} className="gap-2">
            <Plus className="w-4 h-4" />
            Depositar
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <CardDescription>Saldo Disponível</CardDescription>
              <CardTitle className="text-3xl text-success">
                R$ {balance.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Pronto para investir</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium">
            <CardHeader>
              <CardDescription>Saldo Reservado</CardDescription>
              <CardTitle className="text-3xl text-warning">
                R$ {balance.reserved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Em investimentos ativos</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary shadow-primary">
            <CardHeader>
              <CardDescription className="text-primary-foreground/80">Saldo Total</CardDescription>
              <CardTitle className="text-3xl text-primary-foreground">
                R$ {balance.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-foreground/80">Patrimônio na plataforma</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Histórico de Transações
              </CardTitle>
              <CardDescription>Suas últimas movimentações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "deposit" ? "bg-success/10 text-success" :
                          transaction.type === "return" ? "bg-success/10 text-success" :
                          "bg-warning/10 text-warning"
                        }`}>
                          {transaction.amount > 0 ? (
                            <ArrowDownRight className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <span className={`font-bold ${transaction.amount > 0 ? "text-success" : "text-foreground"}`}>
                        {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    {transaction.id !== transactions[transactions.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>Comece a investir agora</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="gradient" 
                className="w-full justify-start gap-2" 
                size="lg"
                onClick={() => navigate("/deposit")}
              >
                <Plus className="w-4 h-4" />
                Fazer Depósito PIX
              </Button>
              <Button 
                variant="default" 
                className="w-full justify-start gap-2" 
                size="lg"
                onClick={() => navigate("/marketplace")}
              >
                <TrendingUp className="w-4 h-4" />
                Ver Oportunidades de Investimento
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2" 
                size="lg"
                onClick={() => navigate("/loan-request")}
              >
                <Wallet className="w-4 h-4" />
                Solicitar Empréstimo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
