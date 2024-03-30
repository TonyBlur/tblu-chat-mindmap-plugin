import { memo, useEffect, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';
import { Markmap } from 'markmap-view';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      Markmap.create(containerRef.current, {}, content || '');
    }
  }, [content]);

  return (
    <Flexbox ref={containerRef} width="100%" />
  );
});

export default Render;
