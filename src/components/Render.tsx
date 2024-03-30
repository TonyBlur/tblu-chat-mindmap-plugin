import LZString from 'lz-string';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ResponseData } from '@/type';

const Render = memo<Partial<ResponseData>>(({ content }) => {
  const url = `https://markmap-renderer.vercel.app/?content=${LZString.compressToEncodedURIComponent(content || '')}`;
  return (
    <Flexbox width="100%">
      {/* <Flexbox distribution={'space-between'} horizontal>
        🌟心情：{mood}
        <span className={styles.date}>{dayjs(today).format('YYYY/MM/DD')}</span>
      </Flexbox>
      <Flexbox gap={8}>
        推荐衣物abc
        <Flexbox gap={12} horizontal style={{ overflow: 'scroll' }}>
          {clothes?.map((item) => (
            <Card key={item.name} size={'small'} title={item.name}>
              {item.description}
            </Card>
          ))}
        </Flexbox>
      </Flexbox> */}
      <iframe 
        border-radius="8px"
        frameBorder="0"
        src={url}
        style={{ 
          height: '100vh', 
          width: '100%'
        }}
        >
          您的浏览器不支持iframe
      </iframe>
    </Flexbox>
  );
});

export default Render;
