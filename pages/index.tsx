// pages/index.tsx - 改良版
import { useState, useEffect } from "react";
import ShopCard from "../components/ShopCard";
import LoadingIndicator from "../components/ui/LoadingIndicator";
import Button from "../components/ui/Button";

type Shop = {
  id: string;
  name: string;
  location: string;
  image: string;
  type: string;
  dish: string;
  rating: number;
  reviewCount: number;
  description: string;
};

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "すべて", "和食", "洋食", "中華", "アジア料理", "スイーツ", "ドリンク", "その他"
  ];

  // ショップデータを取得
  useEffect(() => {
    const fetchShops = async () => {
      try {
        console.log('データ取得開始...');
        const response = await fetch('/data/shops.json');
        console.log('レスポンス状態:', response.status, response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('取得したデータ:', data);
        
        if (data && data.shops && Array.isArray(data.shops)) {
          setShops(data.shops);
          setFilteredShops(data.shops);
          console.log(`${data.shops.length}件のショップを設定しました`);
        } else {
          console.error('データ形式が正しくありません:', data);
          throw new Error('データ形式が正しくありません');
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
        setError(error instanceof Error ? error.message : 'データの取得に失敗しました');
        // エラー時は空配列を設定
        setShops([]);
        setFilteredShops([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  // フィルタリング処理
  useEffect(() => {
    let filtered = shops;

    // カテゴリーフィルター
    if (activeCategory !== "すべて") {
      filtered = filtered.filter(shop => shop.dish === activeCategory);
    }

    // 検索フィルター
    if (searchQuery) {
      filtered = filtered.filter(shop => 
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredShops(filtered);
  }, [shops, activeCategory, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      {/* ヘッダー */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">NOM ! NOM !</div>
            <nav>
              <ul className="nav-list">
                <li><a href="/categories" className="nav-link">カテゴリー</a></li>
                <li><a href="/map" className="nav-link">マップ</a></li>
              </ul>
            </nav>
            <button className="login-button">ログイン</button>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">地元で人気のキッチンカーを見つけよう</h1>
            <form className="hero-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="キッチンカー名や場所で検索..."
                className="hero-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="hero-search-icon">🔍</span>
            </form>
          </div>
        </div>
      </section>

      {/* カテゴリーフィルター */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
        <div className="container">
          <div className="main-categories-tabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`category-tab ${activeCategory === category ? 'active-tab' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="section-title">
            <h2>キッチンカー一覧</h2>
            <span style={{ fontSize: '0.875rem', color: '#718096' }}>
              {filteredShops.length}件のキッチンカー
            </span>
          </div>

          {isLoading ? (
            <LoadingIndicator message="キッチンカーデータを読み込み中..." />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ 
                color: '#ef4444', 
                fontSize: '1.125rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem' 
              }}>
                ⚠️ エラーが発生しました
              </div>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="primary"
              >
                🔄 再読み込み
              </Button>
            </div>
          ) : filteredShops.length > 0 ? (
            <div className="shop-grid">
              {filteredShops.map((shop) => (
                <ShopCard
                  key={shop.id}
                  id={shop.id}
                  name={shop.name}
                  location={shop.location}
                  image={shop.image}
                  type={shop.type}
                  rating={shop.rating}
                  reviewCount={shop.reviewCount}
                  dish={shop.dish}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p>条件に該当するキッチンカーが見つかりませんでした。</p>
              <Button 
                onClick={() => { setSearchQuery(""); setActiveCategory("すべて"); }}
                variant="primary"
              >
                フィルターをリセット
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* フッター */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; 2024 NOM ! NOM ! All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}