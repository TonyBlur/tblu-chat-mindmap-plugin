import LZString from 'lz-string';
import { memo, useEffect } from 'react';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const url = `https://markmap-renderer.vercel.app/?content=${LZString.compressToEncodedURIComponent(content || '')}`;

  useEffect(() => {
    window.parent.location.href = url;
  }, [url]);

  return null;
});

export default Render;
