import { useState, useEffect, useRef } from 'react';

/** True if the URL is same-origin so fetch() won't hit CORS. */
function isSameOrigin(url: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const u = new URL(url, window.location.origin);
    return u.origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * For same-origin URLs: fetches and returns a blob object URL so the original URL isn't exposed.
 * For cross-origin URLs (Behance, Firebase Storage, etc.): skips fetch to avoid CORS errors,
 * returns null so the component uses the original URL. Protection (no right-click, no drag) still applies.
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

    if (!isSameOrigin(url)) {
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
