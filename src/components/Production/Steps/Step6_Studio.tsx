/**
 * Step 6 - Studio (Wrapper)
 */

'use client';

import { useEffect } from 'react';
import { useProductionWorkflowStore } from '@/store/useProductionWorkflowStore';
import { useManifestStore } from '@/store/useManifestStore';
import { Studio } from '@/components/Studio/Studio';

export default function Step6_Studio() {
  const { manifest } = useProductionWorkflowStore();
  const { setManifest } = useManifestStore();
  
  useEffect(() => {
    if (manifest) {
      setManifest(manifest);
    }
  }, [manifest, setManifest]);
  
  if (!manifest) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Nenhum manifest carregado</p>
        <p className="text-sm text-gray-500 mt-2">
          Volte e gere as cenas primeiro
        </p>
      </div>
    );
  }
  
  return (
    <div className="-m-8">
      <Studio />
    </div>
  );
}

