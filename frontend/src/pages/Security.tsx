import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Shield, Smartphone, Monitor, Trash2, MapPin, Clock } from "lucide-react";

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
  icon: typeof Smartphone | typeof Monitor;
}

const Security = () => {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      device: "iPhone 14 Pro - Safari",
      location: "São Paulo, SP",
      lastActive: "Agora",
      isCurrent: true,
      icon: Smartphone,
    },
    {
      id: "2",
      device: "MacBook Pro - Chrome",
      location: "São Paulo, SP",
      lastActive: "2 horas atrás",
      isCurrent: false,
      icon: Monitor,
    },
    {
      id: "3",
      device: "Windows PC - Edge",
      location: "Rio de Janeiro, RJ",
      lastActive: "1 dia atrás",
      isCurrent: false,
      icon: Monitor,
    },
  ]);

  const revokeSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId));
    toast({
      title: "Sessão revogada",
      description: "O dispositivo foi desconectado com sucesso.",
    });
  };

  const revokeAllSessions = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
    toast({
      title: "Sessões revogadas",
      description: "Todos os outros dispositivos foram desconectados.",
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Segurança da Conta</h1>
          <p className="text-muted-foreground">Gerencie dispositivos e sessões ativas</p>
        </div>

        <Card className="bg-gradient-card shadow-medium">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Status de Segurança
                </CardTitle>
                <CardDescription className="mt-2">
                  Sua conta está protegida com autenticação de dois fatores
                </CardDescription>
              </div>
              <Badge variant="success">Protegido</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Verificação MFA</p>
                <p className="font-bold text-success">Ativa</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Verificação KYC</p>
                <p className="font-bold text-success">Aprovada</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Sessões Ativas</p>
                <p className="font-bold">{sessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Dispositivos Conectados</CardTitle>
                <CardDescription>Gerencie os dispositivos com acesso à sua conta</CardDescription>
              </div>
              {sessions.length > 1 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={revokeAllSessions}
                >
                  Revogar Todos
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session, index) => {
                const Icon = session.icon;
                return (
                  <div key={session.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{session.device}</p>
                            {session.isCurrent && (
                              <Badge variant="success" className="text-xs">Atual</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeSession(session.id)}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Revogar
                        </Button>
                      )}
                    </div>
                    {index < sessions.length - 1 && <Separator className="mt-4" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações de Segurança</CardTitle>
            <CardDescription>Proteja ainda mais sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              Alterar Senha
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              Configurar Autenticador
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              Histórico de Atividades
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Security;
