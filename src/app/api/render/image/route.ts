/**
 * API Route: POST /api/render/image
 * Mock de geração de imagens via ComfyUI
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, RenderImageRequest, RenderImageResponse } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config';
import { delay, generateSeed } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body: RenderImageRequest = await request.json();
    
    console.info('[MOCK] POST /api/render/image', {
      sceneId: body.sceneId,
      projectId: body.projectId,
    });
    
    // Simula delay de processamento
    await delay(APP_CONFIG.mockDelays.renderImage);
    
    // Gera mock de resposta
    const seed = body.seed || generateSeed();
    const response: RenderImageResponse = {
      img_start: `/assets/mock/scene_${body.sceneId}_start.png`,
      img_end: body.prompt_end ? `/assets/mock/scene_${body.sceneId}_end.png` : undefined,
      seed,
      version: Math.floor(Math.random() * 20) + 1,
      drift: Math.floor(Math.random() * 40), // 0-40%
    };
    
    const apiResponse: ApiResponse<RenderImageResponse> = {
      success: true,
      data: response,
    };
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error('[MOCK] Error in /api/render/image:', error);
    
    const errorResponse: ApiResponse<RenderImageResponse> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

