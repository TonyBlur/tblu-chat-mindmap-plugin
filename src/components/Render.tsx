import { memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';

import { ResponseData } from '@/type';
import { Card } from 'antd';

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
        document.body.append(downloadLink); // Use Node#append() instead of Node#appendChild()
        downloadLink.click();
        downloadLink.remove(); // Use childNode.remove() instead of parentNode.removeChild(childNode)
      }
    }
  };
  
  return (
    <Flexbox>
      <Card ref={containerRef} >
      <button 
        onClick={downloadSvg} 
        style={{ bottom: '10px', position: 'absolute', right: '10px' }} // Sort object keys in ascending order
        type="button" // Add an explicit type attribute for button
      >
        Download SVG
      </button>
      </Card>
    </Flexbox>
  );
});

export default Render;
