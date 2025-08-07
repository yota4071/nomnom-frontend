// pages/index.tsx - Layoutなしのシンプル版
export default function Home() {
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
            <form className="hero-search">
              <input
                type="text"
                placeholder="キッチンカー名や場所で検索..."
                className="hero-search-input"
              />
              <span className="hero-search-icon">🔍</span>
            </form>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>キッチンカー一覧</h2>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p>キッチンカーのデータを読み込み中...</p>
          </div>
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