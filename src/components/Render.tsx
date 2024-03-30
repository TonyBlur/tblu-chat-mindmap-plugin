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
      // Create a transformer instance
      const transformer = new Transformer();

      // Transform the Markdown content to a Markmap data structure
      const result = transformer.transform(content || '');

      // Create an SVG element in the container
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      containerRef.current.appendChild(svg);

      // Create a new markmap in the SVG with the root of the transformed data
      Markmap.create(svg, {}, result.root);

      // Add styles to the SVG
      svg.style.width = '100%';
      svg.style.height = '100%';
    }
  }, [content]);

  return (
    <Flexbox height="100%" ref={containerRef} width="100%" />
  );
});

export default Render;
