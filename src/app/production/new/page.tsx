/**
 * Página do Wizard de Produção
 */

'use client';

import { Suspense } from 'react';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import { ProductionWizard } from '@/components/Production/ProductionWizard';
import Step1_SelectChannel from '@/components/Production/Steps/Step1_SelectChannel';
import Step2_SelectVideoStyle from '@/components/Production/Steps/Step2_SelectVideoStyle';
import Step3_GenerateIdeas from '@/components/Production/Steps/Step3_GenerateIdeas';
import Step4_GenerateScript from '@/components/Production/Steps/Step4_GenerateScript';
import Step5_GenerateScenes from '@/components/Production/Steps/Step5_GenerateScenes';
import Step6_Studio from '@/components/Production/Steps/Step6_Studio';
import Step7_Export from '@/components/Production/Steps/Step7_Export';

function WizardContent() {
  const { currentStep } = useProductionWorkflowStore();
  
  return (
    <ProductionWizard>
      {currentStep === 1 && <Step1_SelectChannel />}
      {currentStep === 2 && <Step2_SelectVideoStyle />}
      {currentStep === 3 && <Step3_GenerateIdeas />}
      {currentStep === 4 && <Step4_GenerateScript />}
      {currentStep === 5 && <Step5_GenerateScenes />}
      {currentStep === 6 && <Step6_Studio />}
      {currentStep === 7 && <Step7_Export />}
    </ProductionWizard>
  );
}

export default function ProductionNewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    }>
      <WizardContent />
    </Suspense>
  );
}

