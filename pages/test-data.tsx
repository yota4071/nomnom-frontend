// pages/test-data.tsx - データ読み込みテスト
import { useEffect, useState } from 'react';

export default function TestData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('データ取得開始');
        const response = await fetch('/data/shops.json');
        console.log('レスポンス:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('取得データ:', result);
        setData(result);
      } catch (err) {
        console.error('エラー:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>データ読み込みテスト</h1>
      <pre style={{ background: '#f4f4f4', padding: '1rem', overflow: 'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}