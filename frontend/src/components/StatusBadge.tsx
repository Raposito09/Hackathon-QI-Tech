import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const configs = {
    pending: {
      variant: "warning" as const,
      icon: Clock,
      label: "Pendente",
    },
    approved: {
      variant: "success" as const,
      icon: CheckCircle,
      label: "Aprovado",
    },
    rejected: {
      variant: "destructive" as const,
      icon: XCircle,
      label: "Rejeitado",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1 px-3 py-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
};
