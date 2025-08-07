// components/category/CategoryCard.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type CategoryCardProps = {
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  count?: number;
  backgroundColor?: string;
  isSmall?: boolean;
};

export default function CategoryCard({
  name,
  description = '',
  icon = '🍽️',
  image,
  count = 0,
  backgroundColor = '#f0f9ff',
  isSmall = false,
}: CategoryCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    router.push(`/categories?category=${encodeURIComponent(name)}`);
  };
  
  const getBackgroundColor = () => {
    // 各カテゴリーに固有の色を割り当てる
    const colorMap: Record<string, string> = {
      '和食': '#f0f9ff', // 青系
      '洋食': '#fdf2f8', // ピンク系
      '中華': '#fef3c7', // 黄色系
      'アジア料理': '#ecfdf5', // 緑系
      'スイーツ': '#fdf2f8', // ピンク系
      'ドリンク': '#eff6ff', // 青系
      'その他': '#f3f4f6', // グレー系
    };
    
    return colorMap[name] || backgroundColor;
  };

  const getCategorySVG = () => {
    const svgMap: Record<string, string> = {
      '洋食': 'https://www.svgrepo.com/show/327760/fast-food.svg',
      '和食': 'https://www.svgrepo.com/show/482367/sushi.svg',
      '中華': 'https://www.svgrepo.com/show/490633/chinese-fried-rice.svg',
      'アジア料理': 'https://www.svgrepo.com/show/500569/food.svg',
      'スイーツ': 'https://www.svgrepo.com/show/510012/ice-cream-cone.svg',
      'ドリンク': 'https://www.svgrepo.com/show/511896/drink-round-688.svg',
      'その他': 'https://www.svgrepo.com/show/490737/food-dish.svg',
    };
    
    return svgMap[name] || 'https://www.svgrepo.com/show/490737/food-dish.svg';
  };

  return (
    <div
      className="compact-category-card"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 8px 25px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="compact-category-icon">
        <img 
          src={getCategorySVG()}
          alt={name}
          width={40}
          height={40}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}
        />
      </div>
      
      <div className="compact-category-info">
        <h3 className="compact-category-name">{name}</h3>
        <div className="compact-category-count">{count}店舗</div>
      </div>
      
      <style jsx>{`
        .compact-category-card {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
          min-width: 150px;
          white-space: nowrap;
        }
        
        .compact-category-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: ${getBackgroundColor()};
          border-radius: 10px;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .compact-category-info {
          flex: 1;
          min-width: 0;
        }
        
        .compact-category-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 0 0 2px 0;
        }
        
        .compact-category-count {
          font-size: 12px;
          color: #666;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .compact-category-card {
            min-width: 130px;
            padding: 10px 14px;
          }
          
          .compact-category-icon {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          
          .compact-category-name {
            font-size: 13px;
          }
          
          .compact-category-count {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}