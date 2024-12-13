import { SpeedInsights } from '@vercel/speed-insights/next';

const SpeedInsightsComponent = () => {
  return (
    <div>
      <h2>Speed Insights</h2>
      <SpeedInsights
        options={{
          thresholds: {
            performance: 50,
            accessibility: 50,
            bestPractices: 50,
            seo: 50,
            pwa: 50,
          },
        }}
      />
    </div>
  );
};

export default SpeedInsightsComponent; 