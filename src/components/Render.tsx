import { memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Create a transformer instance
      const transformer = new Transformer();

      // Transform the Markdown content to a Markmap data structure
      const result = transformer.transform(content || '');

      // Create a new markmap in the container with the root of the transformed data
      Markmap.create(containerRef.current, {}, result.root);
    }
  }, [content]);

  return (
    <Flexbox ref={containerRef} width="100%" />
  );
});

export default Render;