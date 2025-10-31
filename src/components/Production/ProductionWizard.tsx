/**
 * ProductionWizard - Container do wizard de produção com stepper
 */

'use client';

import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import Button from '@/components/UI/Button';
import { cn } from '@/lib/utils';

const STEPS = [
  { number: 1, label: 'Canal' },
  { number: 2, label: 'Estilo' },
  { number: 3, label: 'Ideias' },
  { number: 4, label: 'Roteiro' },
  { number: 5, label: 'Cenas' },
  { number: 6, label: 'Studio' },
  { number: 7, label: 'Export' },
];

export function ProductionWizard({ children }: { children: React.ReactNode }) {
  const { currentStep, prevStep, nextStep, canAdvance } = useProductionWorkflowStore();
  
  return (
    <div className="min-h-screen bg-dark-950 p-8">
      {/* Header com Stepper */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Nova Produção</h1>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex items-center">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                currentStep === step.number && 'bg-primary text-white',
                currentStep > step.number && 'bg-green-500 text-white',
                currentStep < step.number && 'bg-dark-700 text-gray-500'
              )}>
                {step.number}
              </div>
              <span className="ml-2 text-sm text-gray-400">{step.label}</span>
              {idx < STEPS.length - 1 && (
                <div className={cn(
                  'w-16 h-1 mx-4',
                  currentStep > step.number ? 'bg-green-500' : 'bg-dark-700'
                )} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-dark-900 rounded-2xl border border-dark-700 p-8 min-h-[500px]">
          {children}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            ← Voltar
          </Button>
          
          <Button
            variant="primary"
            onClick={nextStep}
            disabled={!canAdvance()}
          >
            {currentStep === 7 ? 'Finalizar' : 'Próximo →'}
          </Button>
        </div>
      </div>
    </div>
  );
}

