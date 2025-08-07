// components/Header.tsx - シンプル版
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type HeaderProps = {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
};

export default function Header({ }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // 検索処理
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    setSearchQuery('');
  };


  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo">
            NOM ! NOM !
          </Link>

          <nav>
            <ul className="nav-list">
              <li><Link href="/categories" className="nav-link">カテゴリー</Link></li>
              <li><Link href="/map" className="nav-link">マップ</Link></li>
            </ul>
          </nav>

          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="キッチンカーを検索..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </form>
          </div>

          <button className="login-button">
            ログイン
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="container">
          <form onSubmit={handleSearch} className="mobile-search">
            <input
              type="text"
              placeholder="キッチンカーを検索..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </form>
          <ul>
            <li className="mobile-nav-item"><Link href="/">ホーム</Link></li>
            <li className="mobile-nav-item"><Link href="/categories">カテゴリー</Link></li>
            <li className="mobile-nav-item"><Link href="/map">マップ</Link></li>
            <li className="mobile-nav-item">
              <button className="login-button">ログイン</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );


}


