import { cn } from '@/lib/utils';

interface StepsProps {
  steps: number;
  currentStep: number;
  className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length: steps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-2 flex-1 rounded-full transition-colors',
            i <= currentStep ? 'bg-primary' : 'bg-muted'
          )}
        />
      ))}
    </div>
  );
}
