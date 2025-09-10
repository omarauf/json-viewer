import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Output({ className }: Props) {
  return (
    <div className={cn("bg-muted", className)}>
      <h1>Output</h1>
    </div>
  );
}
