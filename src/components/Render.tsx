import { memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Markmap } from 'markmap-view';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Create a new markmap in the container
      const viewer = Markmap.create(containerRef.current, null, content || '');

      // You might want to save the viewer instance if you need to interact with it later
      // For example, you can update the markmap content by calling viewer.setData()
    }
  }, [content]);

  return (
    <Flexbox width="100%" ref={containerRef} />
  );
});

export default Render;
