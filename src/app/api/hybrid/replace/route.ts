/**
 * API Route: POST /api/hybrid/replace
 * Mock de busca e substituição com stock footage
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, HybridReplaceRequest, HybridReplaceResponse } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config';
import { delay } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body: HybridReplaceRequest = await request.json();
    
    console.info('[MOCK] POST /api/hybrid/replace', {
      sceneId: body.sceneId,
      query: body.query,
      source: body.source,
    });
    
    // Simula delay de busca e download
    await delay(APP_CONFIG.mockDelays.hybridReplace);
    
    // Gera mock de resposta
    const response: HybridReplaceResponse = {
      video: `/assets/mock/hybrid_${body.sceneId}_${body.source}.mp4`,
      url: `https://${body.source}.com/video/mock-${Date.now()}`,
      source: body.source,
      license_proof: `${body.source}_license_${Date.now()}`,
    };
    
    const apiResponse: ApiResponse<HybridReplaceResponse> = {
      success: true,
      data: response,
    };
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error('[MOCK] Error in /api/hybrid/replace:', error);
    
    const errorResponse: ApiResponse<HybridReplaceResponse> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

