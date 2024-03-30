import LZString from 'lz-string';
import { memo } from 'react';
// import { Flexbox } from 'react-layout-kit';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const url = `https://markmap-renderer.vercel.app/?content=${LZString.compressToEncodedURIComponent(content || '')}`;

  return (
    <iframe 
      frameBorder="0"
      src={url}
      style={{ 
        borderRadius: '8px',
        height: '100vh', 
        width: '100%'
      }}
      >
        您的浏览器不支持iframe
    </iframe>
  );
});

export default Render;
