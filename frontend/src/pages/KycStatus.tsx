import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, FileText, User, Calendar } from "lucide-react";

type KycStatusType = "pending" | "approved" | "rejected";

const KycStatus = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<KycStatusType>("pending");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula chamada à API GET /users/{id}/kyc/status
    const fetchStatus = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Para demo, alterna entre os status
      const statuses: KycStatusType[] = ["pending", "approved", "rejected"];
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      setIsLoading(false);
    };

    fetchStatus();
  }, []);

  const statusMessages = {
    pending: {
      title: "Verificação em Análise",
      description: "Seus documentos estão sendo analisados pela nossa equipe. Este processo pode levar até 24 horas.",
      icon: Clock,
      iconColor: "text-warning",
    },
    approved: {
      title: "Verificação Aprovada",
      description: "Parabéns! Sua identidade foi verificada com sucesso. Agora você tem acesso completo à plataforma.",
      icon: User,
      iconColor: "text-success",
    },
    rejected: {
      title: "Verificação Rejeitada",
      description: "Infelizmente, não foi possível validar seus documentos. Por favor, envie novamente documentos mais claros.",
      icon: FileText,
      iconColor: "text-destructive",
    },
  };

  const currentStatus = statusMessages[status];
  const Icon = currentStatus.icon;

  return (
    <AuthLayout title="Status de Verificação">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <StatusBadge status={status} />
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('pt-BR')}
          </span>
        </div>

        <Card className="border-0 shadow-none bg-muted/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-full bg-background ${currentStatus.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl">{currentStatus.title}</CardTitle>
            </div>
            <CardDescription className="text-base">
              {currentStatus.description}
            </CardDescription>
          </CardHeader>
        </Card>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Informações da Solicitação</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data de Envio:</span>
              <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Documentos Enviados:</span>
              <span className="font-medium">3 arquivos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tempo Estimado:</span>
              <span className="font-medium">Até 24 horas</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4">
          {status === "rejected" && (
            <Button 
              variant="gradient" 
              className="w-full" 
              size="lg"
              onClick={() => navigate("/kyc/upload")}
            >
              Enviar Novamente
            </Button>
          )}
          
          {status === "approved" && (
            <Button 
              variant="success" 
              className="w-full" 
              size="lg"
              onClick={() => navigate("/")}
            >
              Ir para Dashboard
            </Button>
          )}

          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default KycStatus;
