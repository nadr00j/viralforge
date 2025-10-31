/**
 * API Route: PATCH /api/scenes/[id]
 * Mock de atualização de cena
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, VFScene } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config';
import { delay } from '@/lib/utils';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sceneId = params.id;
    const updates: Partial<VFScene> = await request.json();
    
    console.info('[MOCK] PATCH /api/scenes/:id', {
      sceneId,
      updates: Object.keys(updates),
    });
    
    // Simula delay
    await delay(APP_CONFIG.mockDelays.apiCall);
    
    // Mock de cena atualizada (na prática viria do banco)
    const mockScene: VFScene = {
      id: sceneId,
      mode: updates.mode || 'image',
      duration: updates.duration || 2,
      prompt_start: updates.prompt_start,
      prompt_end: updates.prompt_end,
      seed: updates.seed,
      reference_tags: updates.reference_tags,
      assets: updates.assets || {},
      status: updates.status || 'ready',
      version: updates.version || 1,
      drift: updates.drift,
      notes: updates.notes,
    };
    
    const apiResponse: ApiResponse<VFScene> = {
      success: true,
      data: mockScene,
    };
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error('[MOCK] Error in /api/scenes/:id:', error);
    
    const errorResponse: ApiResponse<VFScene> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

