import LZString from 'lz-string';
import { memo, useEffect, useState } from 'react';
import ReactSVG from 'react-svg';
// import { Flexbox } from 'react-layout-kit';
import axios from 'axios';
import { JSDOM } from 'jsdom';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const [svgContent, setSvgContent] = useState('');
  const url = `https://markmap-renderer.vercel.app/?content=${LZString.compressToEncodedURIComponent(content || '')}`;

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const dom = new JSDOM(response.data);
        const svgElement = dom.window.document.querySelector('svg');
        if (svgElement) {
          setSvgContent(svgElement.outerHTML);
        }
      })
      .catch(error => {
        console.error('Error fetching HTML:', error);
      });
  }, [url]);

  return (
    <ReactSVG src={`data:image/svg+xml,${encodeURIComponent(svgContent)}`} />
  );

  // return (
  //   <Flexbox width="100%">
  //     <iframe 
  //       frameBorder="0"
  //       src={url}
  //       style={{ 
  //         borderRadius: '8px',
  //         height: '100vh', 
  //         width: '100%'
  //       }}
  //       >
  //         您的浏览器不支持iframe
  //     </iframe>
  //   </Flexbox>
  // );
});

export default Render;
