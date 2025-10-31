/**
 * API Route: POST /api/render/video
 * Mock de geração de vídeo via FFmpeg
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, RenderVideoRequest, RenderVideoResponse } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config';
import { delay } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body: RenderVideoRequest = await request.json();
    
    console.info('[MOCK] POST /api/render/video', {
      sceneId: body.sceneId,
      duration: body.duration,
    });
    
    // Simula delay de processamento
    await delay(APP_CONFIG.mockDelays.renderVideo);
    
    // Gera mock de resposta
    const response: RenderVideoResponse = {
      video: `/assets/mock/scene_${body.sceneId}_video.mp4`,
      duration: body.duration,
    };
    
    const apiResponse: ApiResponse<RenderVideoResponse> = {
      success: true,
      data: response,
    };
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error('[MOCK] Error in /api/render/video:', error);
    
    const errorResponse: ApiResponse<RenderVideoResponse> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

