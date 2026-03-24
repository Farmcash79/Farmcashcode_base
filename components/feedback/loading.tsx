import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
  fullPage?: boolean;
}

export function Loading({
  className,
  text = "Loading...",
  fullPage = false,
}: Readonly<LoadingProps>) {
  if (fullPage) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] gap-2">
        <Loader2 className={cn("h-7 w-7 animate-spin", className)} />
        <p className="text-sm animate-pulse font-bold">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Loader2 className={cn("h-4 w-4 animate-spin", className)} />
      {text && <span className="text-sm">{text}</span>}
    </div>
  );
}
