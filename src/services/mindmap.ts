import { RequestData } from '@/type';

export const fetchMindmap = async (params: RequestData) => {
  const res = await fetch('/api/mindmap', {
    body: JSON.stringify(params),
    method: 'POST',
  });

  return res.json();
};
