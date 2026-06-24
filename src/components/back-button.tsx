import { useRouter } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  const onClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl border border-border bg-white/5 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-white/10 hover:border-primary/40 ${className}`}
      aria-label="بازگشت"
    >
      <ArrowRight className="h-4 w-4" />
      بازگشت
    </button>
  );
}
