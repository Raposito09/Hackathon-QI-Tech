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
import { Loader2, Upload, FileText, CheckCircle } from "lucide-react";

const kycSchema = z.object({
  documentFront: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Documento frente é obrigatório",
  }),
  documentBack: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Documento verso é obrigatório",
  }),
  selfie: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "Selfie é obrigatória",
  }),
});

type KycForm = z.infer<typeof kycSchema>;

const KycUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    documentFront: false,
    documentBack: false,
    selfie: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<KycForm>({
    resolver: zodResolver(kycSchema),
  });

  const watchedFields = watch();

  const onSubmit = async (data: KycForm) => {
    setIsLoading(true);
    try {
      // Simula upload para o endpoint POST /users/{id}/kyc/upload
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast({
        title: "Documentos enviados!",
        description: "Sua verificação está em análise.",
      });
      
      setTimeout(() => navigate("/kyc/status"), 1000);
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar os documentos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Verificação de Identidade" 
      description="Envie seus documentos para validação"
    >
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Para sua segurança, precisamos validar sua identidade. Envie fotos claras dos seus documentos.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="documentFront" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documento (Frente)
          </Label>
          <div className="relative">
            <Input
              id="documentFront"
              type="file"
              accept="image/*"
              {...register("documentFront")}
              disabled={isLoading}
              onChange={(e) => {
                register("documentFront").onChange(e);
                setUploadedFiles(prev => ({ ...prev, documentFront: e.target.files!.length > 0 }));
              }}
            />
            {watchedFields.documentFront && watchedFields.documentFront.length > 0 && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
            )}
          </div>
          {errors.documentFront && (
            <p className="text-sm text-destructive">{errors.documentFront.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="documentBack" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documento (Verso)
          </Label>
          <div className="relative">
            <Input
              id="documentBack"
              type="file"
              accept="image/*"
              {...register("documentBack")}
              disabled={isLoading}
              onChange={(e) => {
                register("documentBack").onChange(e);
                setUploadedFiles(prev => ({ ...prev, documentBack: e.target.files!.length > 0 }));
              }}
            />
            {watchedFields.documentBack && watchedFields.documentBack.length > 0 && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
            )}
          </div>
          {errors.documentBack && (
            <p className="text-sm text-destructive">{errors.documentBack.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="selfie" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Selfie com Documento
          </Label>
          <div className="relative">
            <Input
              id="selfie"
              type="file"
              accept="image/*"
              {...register("selfie")}
              disabled={isLoading}
              onChange={(e) => {
                register("selfie").onChange(e);
                setUploadedFiles(prev => ({ ...prev, selfie: e.target.files!.length > 0 }));
              }}
            />
            {watchedFields.selfie && watchedFields.selfie.length > 0 && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success" />
            )}
          </div>
          {errors.selfie && (
            <p className="text-sm text-destructive">{errors.selfie.message}</p>
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
              Enviando documentos...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Enviar Documentos
            </>
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default KycUpload;
