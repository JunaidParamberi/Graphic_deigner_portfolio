import { useState, useEffect, useRef } from 'react';

/**
 * Fetches a URL and returns a blob object URL so the original URL isn't exposed in the DOM.
 * Revokes the blob URL on unmount or when url changes. Falls back to original URL if fetch fails (e.g. CORS).
 */
export function useBlobUrl(url: string | undefined, _type: 'image' | 'video'): { blobUrl: string | null; fallbackUrl: string; loading: boolean } {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!url);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!url) {
      setBlobUrl(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setBlobUrl(null);

    fetch(url, { mode: 'cors' })
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        setBlobUrl(objectUrl);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setBlobUrl(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [url]);

  return { blobUrl, fallbackUrl: url || '', loading };
}
