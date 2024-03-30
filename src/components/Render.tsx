import { memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import { transform, createViewer } from 'markmap-lib';
import { loadPlugins } from 'markmap-view';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Transform the markdown content into markmap data
      const { root, features } = transform(content || '');

      // Load necessary plugins based on the features used in the content
      const { Viewer } = loadPlugins(features);

      // Create a new markmap in the container
      const viewer = new Viewer(containerRef.current, null, root);

      // You might want to save the viewer instance if you need to interact with it later
      // For example, you can update the markmap content by calling viewer.setData()
    }
  }, [content]);

  return (
    <Flexbox width="100%" ref={containerRef} />
  );
});

export default Render;
