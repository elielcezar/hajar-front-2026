import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold">Página Não Encontrada</h2>
        <p className="text-muted-foreground text-lg">
          Desculpe, a página que você está procurando não existe ou foi removida.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Voltar para Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

