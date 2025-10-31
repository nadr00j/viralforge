/**
 * ScenePreview - Preview Triplo (Start / End / Clip)
 */

'use client';

import { useScenes } from '@/hooks/useScenes';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import ImagePlaceholder from '@/components/UI/ImagePlaceholder';
import VideoPlaceholder from '@/components/UI/VideoPlaceholder';

export default function ScenePreview() {
  const { selectedScene } = useScenes();
  
  if (!selectedScene) return null;
  
  const { assets, seed, duration } = selectedScene;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Preview</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Start Image */}
        <div>
          <label className="block text-xs text-gray-500 mb-2">Start Image</label>
          {assets.img_start ? (
            <img
              src={assets.img_start}
              alt="Start"
              className="w-full rounded-lg aspect-9-16 object-cover bg-dark-800"
            />
          ) : (
            <ImagePlaceholder
              text="Start"
              seed={seed || 123456}
              ratio="9:16"
            />
          )}
        </div>
        
        {/* End Image */}
        {selectedScene.mode === 'image' && (
          <div>
            <label className="block text-xs text-gray-500 mb-2">End Image</label>
            {assets.img_end ? (
              <img
                src={assets.img_end}
                alt="End"
                className="w-full rounded-lg aspect-9-16 object-cover bg-dark-800"
              />
            ) : (
              <ImagePlaceholder
                text="End"
                seed={seed ? seed + 1 : 123457}
                ratio="9:16"
                variant="pattern"
              />
            )}
          </div>
        )}
        
        {/* Video Clip */}
        <div>
          <label className="block text-xs text-gray-500 mb-2">Video Clip</label>
          {assets.video ? (
            <video
              src={assets.video}
              controls
              className="w-full rounded-lg aspect-9-16 bg-dark-800"
            />
          ) : (
            <VideoPlaceholder
              text="Video"
              duration={duration}
              ratio="9:16"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

