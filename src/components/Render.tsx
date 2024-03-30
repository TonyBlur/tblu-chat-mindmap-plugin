import { memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  // Specify the type of the ref
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear the container
      containerRef.current.innerHTML = '';

      // Create a transformer instance
      const transformer = new Transformer();

      // Transform the Markdown content to a Markmap data structure
      const result = transformer.transform(content || '');

      // Create an SVG element in the container
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      
      // Use Node#append() instead of Node#appendChild()
      containerRef.current.append(svg);

      // Create a new markmap in the SVG with the root of the transformed data
      Markmap.create(svg, {}, result.root);

      // Add styles to the SVG
      svg.style.width = '100%';
      svg.style.height = '96vh';
    }
  }, [content]);

  // Function to download the SVG file
  const downloadSvg = () => {
    if (containerRef.current) {
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svg);
        const url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "markmap.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <Flexbox 
      height="100%" 
      ref={containerRef} 
      width="100%" 
      style={{ border: '1px solid #333333', borderRadius: '8px', position: 'relative' }} // Add border style
    >
      <button 
        onClick={downloadSvg} 
        style={{ position: 'absolute', right: '10px', bottom: '10px' }} // Position the button at the bottom right corner
      >
        Download SVG
      </button>
    </Flexbox>
  );
});

export default Render;
