import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal, Check, Loader2 } from 'lucide-react';

const loadingSteps = [
  { text: 'Initializing system...', delay: 0 },
  { text: 'Connecting to cloud services...', delay: 400 },
  { text: 'Provisioning infrastructure...', delay: 800 },
  { text: 'Deploying containers...', delay: 1200 },
  { text: 'Configuring network...', delay: 1600 },
  { text: 'System ready', delay: 2000 },
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Step animations
    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        if (index > 0) {
          setCompletedSteps((prev) => [...prev, index - 1]);
        }
      }, step.delay);
    });

    // Complete last step and trigger exit
    setTimeout(() => {
      setCompletedSteps((prev) => [...prev, loadingSteps.length - 1]);
    }, 2400);

    setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      {/* Background grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
      
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-primary/20 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-secondary/20 blur-[100px]"
        />
      </div>

      <div className="relative w-full max-w-lg px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-center gap-3"
        >
          <Terminal className="h-8 w-8 text-primary" />
          <span className="font-mono text-2xl font-bold text-primary">devops.engineer</span>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="terminal overflow-hidden"
        >
          <div className="terminal-header">
            <div className="terminal-dot bg-destructive" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-secondary" />
            <span className="ml-4 text-xs text-muted-foreground">bootstrap.sh</span>
          </div>

          <div className="space-y-3 p-4">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: index <= currentStep ? 1 : 0,
                  x: index <= currentStep ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 font-mono text-sm"
              >
                {completedSteps.includes(index) ? (
                  <Check className="h-4 w-4 text-secondary" />
                ) : index === currentStep ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <div className="h-4 w-4" />
                )}
                <span
                  className={
                    completedSteps.includes(index)
                      ? 'text-muted-foreground'
                      : index === currentStep
                      ? 'text-foreground'
                      : 'text-muted-foreground/50'
                  }
                >
                  <span className="text-secondary">$</span> {step.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              />
            </div>
          </div>
        </motion.div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2 font-mono text-sm text-muted-foreground"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-2 rounded-full bg-primary"
          />
          <span>Provisioning Infrastructure...</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
