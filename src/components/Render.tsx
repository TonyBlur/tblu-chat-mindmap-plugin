import { memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Markmap } from 'markmap-view';
import { transform } from 'markmap-lib';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const data = transform(content || '');

      Markmap.create(containerRef.current, {}, data);
    }
  }, [content]);

  return (
    <Flexbox ref={containerRef} width="100%" />
  );
});

export default Render;
