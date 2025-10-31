/**
 * API Routes: GET/PUT /api/manifest/[projectId]
 * Mock de gerenciamento de manifest
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, VFManifest } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config';
import { delay } from '@/lib/utils';
import { loadManifest, saveManifest } from '@/lib/localStorage';

export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const projectId = params.projectId;
    
    console.info('[MOCK] GET /api/manifest/:projectId', { projectId });
    
    // Simula delay
    await delay(APP_CONFIG.mockDelays.apiCall);
    
    // Carrega do localStorage
    const manifest = loadManifest(projectId);
    
    if (!manifest) {
      const errorResponse: ApiResponse<VFManifest> = {
        success: false,
        error: 'Manifest not found',
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }
    
    const apiResponse: ApiResponse<VFManifest> = {
      success: true,
      data: manifest,
    };
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error('[MOCK] Error in GET /api/manifest/:projectId:', error);
    
    const errorResponse: ApiResponse<VFManifest> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const projectId = params.projectId;
    const manifest: VFManifest = await request.json();
    
    console.info('[MOCK] PUT /api/manifest/:projectId', { projectId });
    
    // Simula delay
    await delay(APP_CONFIG.mockDelays.apiCall);
    
    // Salva no localStorage
    saveManifest(manifest);
    
    const apiResponse: ApiResponse<VFManifest> = {
      success: true,
      data: manifest,
    };
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error('[MOCK] Error in PUT /api/manifest/:projectId:', error);
    
    const errorResponse: ApiResponse<VFManifest> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

