// components/Header.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, provider } from '@/lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import styles from '@/styles/header.module.css';
import { checkIsAdmin } from '@/lib/admin'; // 追加

// 管理者ユーザーIDの配列
const ADMIN_USER_IDS: string[] = [
  // 管理者のuidをここに追加
  "2",
  "1"
];



type HeaderProps = {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
};

export default function Header({  }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false); // 管理者フラグ追加

   // ユーザー認証状態の監視
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // 管理者かどうか確認
        const adminStatus = await checkIsAdmin(user);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ログイン処理
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsMenuOpen(false);
    } catch (err) {
      console.error("ログインエラー", err);
    }
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (err) {
      console.error("ログアウトエラー", err);
    }
  };

 // components/Header.tsxを修正して管理者アクセス機能を追加

// 検索処理の部分を修正
// handleSearch 関数を更新
const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  
    const trimmedQuery = searchQuery.trim().toLowerCase();
  
    if (!trimmedQuery) return;
  
    // 特殊コマンドのチェック
    if (trimmedQuery === "waka") {
      router.push('/waka-invaders');
      setSearchQuery('');
      return;
    }
  
    if (trimmedQuery === "oz") {
      router.push('/oz-invaders');
      setSearchQuery('');
      return;
    }
  
    // 管理者アクセスコマンド
    if (trimmedQuery === "admin123") {
      router.push('/admin/calendar');
      setSearchQuery('');
      return;
    }
  
    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    setSearchQuery('');
  };


  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
        <Link href="/" className="logo">
        <span style={{ fontFamily: "'Bangers', cursive", fontSize: '45px' }}>
            NOM ! NOM !
        </span>
        </Link>

          <nav>
            <ul className="nav-list">
              {/* <li><Link href="/" className="nav-link">ホーム</Link></li> */}
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

          


{user ? (
  <div className="user-menu">
    <Link href="/mypage" className="nav-link">
      マイページ
    </Link>
    
    {/* 管理者向けメニューを追加 - ハードコードされたIDの配列を使わず、isAdmin状態を使用 */}
    {isAdmin && (
      <div className={styles['admin-menu-dropdown']}>
        <button className={styles['admin-dropdown-button']}>
          管理メニュー ▼
        </button>
        <div className={styles['admin-dropdown-content']}>
          <Link href="/admin/calendar" className={styles['admin-link']}>
            カレンダー管理
          </Link>
          <Link href="/admin/shops" className={styles['admin-link']}>
            店舗管理
          </Link>
        </div>
      </div>
    )}
    <button onClick={handleLogout} className="login-button">
      ログアウト
    </button>
  </div>
) : (
  <button onClick={handleLogin} className="login-button">
    ログイン
  </button>
)}


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
      <span className="search-icon"></span>
    </form>
    <ul>
      <li className="mobile-nav-item"><Link href="/">ホーム</Link></li>
      <li className="mobile-nav-item"><Link href="/categories">カテゴリー</Link></li>
      <li className="mobile-nav-item"><Link href="/map">マップ</Link></li>
      <li className="mobile-nav-item"><Link href="/calendar">カレンダー</Link></li>
      
      {user ? (
        <>
          <li className="mobile-nav-item"><Link href="/mypage">マイページ</Link></li>
          {/* 管理者メニュー */}
          {isAdmin && (
            <>
              <li className={`mobile-nav-item ${styles['mobile-admin-title']}`}>管理者メニュー</li>
              <li className={`mobile-nav-item ${styles['mobile-admin-item']}`}>
                <Link href="/admin/calendar">カレンダー管理</Link>
              </li>
              <li className={`mobile-nav-item ${styles['mobile-admin-item']}`}>
                <Link href="/admin/shops">店舗管理</Link>
              </li>
            </>
          )}
          <li className="mobile-nav-item">
            <button onClick={handleLogout} className={styles['mobile-logout-button']}>ログアウト</button>
          </li>
        </>
      ) : (
        <li className="mobile-nav-item">
          <button onClick={handleLogin} className={styles['mobile-login-button']}>ログイン</button>
        </li>
      )}
      
      
    </ul>
  </div>
</div>
    </header>
  );


}


