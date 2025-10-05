import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingDown, Users, FileCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingDown,
      title: "Taxas Reduzidas",
      description: "Até 40% mais baixas que bancos tradicionais",
    },
    {
      icon: Users,
      title: "Empréstimos P2P",
      description: "Conectamos investidores diretamente a tomadores",
    },
    {
      icon: Shield,
      title: "Segurança Garantida",
      description: "Verificação rigorosa e proteção de dados",
    },
    {
      icon: FileCheck,
      title: "Processo Transparente",
      description: "Análise de crédito e documentação clara",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-primary">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ConfyPay</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Entrar
            </Button>
            <Button variant="gradient" onClick={() => navigate("/register")}>
              Criar Conta
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Empréstimos P2P com Taxas Justas
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Conecte-se diretamente com investidores e consiga empréstimos com taxas até 40% menores que bancos tradicionais. Seguro, transparente e rápido.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="gradient" 
                size="lg" 
                className="text-lg"
                onClick={() => navigate("/register")}
              >
                Solicitar Empréstimo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg"
                onClick={() => navigate("/login")}
              >
                Quero Investir
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground mb-12">
              Empréstimo ou investimento em poucos passos
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Cadastre-se", desc: "Crie sua conta gratuita" },
                { step: "2", title: "Verificação", desc: "Validação KYC segura" },
                { step: "3", title: "Escolha", desc: "Solicite ou invista" },
                { step: "4", title: "Pronto", desc: "Acompanhe tudo online" },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-3 shadow-primary">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ConfyPay. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
