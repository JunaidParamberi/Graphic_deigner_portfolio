import React from 'react';
import { useBlobUrl } from '../../hooks/useBlobUrl';

const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

type ProtectedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & { src: string };

export const ProtectedImage: React.FC<ProtectedImageProps> = ({ src, onLoad, ...props }) => {
  const { blobUrl, fallbackUrl } = useBlobUrl(src, 'image');
  const displaySrc = blobUrl || fallbackUrl;

  if (!displaySrc) return null;

  return (
    <img
      {...props}
      src={displaySrc}
      draggable={false}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      style={{ userSelect: 'none', pointerEvents: 'auto', ...props.style }}
      onLoad={onLoad}
    />
  );
};

type ProtectedVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & { src: string };

export const ProtectedVideo: React.FC<ProtectedVideoProps> = ({ src, onLoadedData, ...props }) => {
  const { blobUrl, fallbackUrl } = useBlobUrl(src, 'video');
  const displaySrc = blobUrl || fallbackUrl;

  if (!displaySrc) return null;

  return (
    <video
      {...props}
      src={displaySrc}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      controlsList={props.controlsList ?? 'nodownload'}
      style={{ userSelect: 'none', ...props.style }}
      onLoadedData={onLoadedData}
    />
  );
}
