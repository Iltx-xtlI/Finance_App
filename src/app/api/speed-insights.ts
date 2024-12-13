import { NextApiRequest, NextApiResponse } from 'next';
import { injectSpeedInsights } from '@vercel/speed-insights';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = req.query.url as string; // Get the URL from the query parameters

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const insights = await injectSpeedInsights({ url });
    return res.status(200).json(insights);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch speed insights' });
  }
} 