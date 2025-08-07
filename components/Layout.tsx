// components/Layout.tsx - シンプル版
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({ 
  children, 
  title = 'NomNom! | 地元で人気のキッチンカーを見つけよう', 
  description = 'お近くの美味しいキッチンカーをすぐに見つけられるアプリ。ユーザーのレビューやお気に入り機能も充実。'
}: LayoutProps) {

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}