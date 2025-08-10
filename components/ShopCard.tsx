// components/ShopCard.tsx
import Link from 'next/link';

type ShopCardProps = {
  id: string;
  name: string;
  location: string;
  image: string;
  type: string;
  rating?: number;
  reviewCount?: number;
  dish?: string;
};

export default function ShopCard({
  id,
  name,
  location,
  image,
  type,
  rating = 0,
  reviewCount = 0,
  dish
}: ShopCardProps) {
  // 星評価の表示
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // 満点の星
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star">★</span>);
    }

    // 半分の星
    if (hasHalfStar) {
      stars.push(<span key="half" className="star">☆</span>);
    }

    // 空の星
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };

  return (
    <Link href={`/shop/${id}`} className="shop-card">
      <div className="shop-image-container">
        <img 
          src={image} 
          alt={name} 
          className="shop-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/sample.jpg';
          }}
        />
        <div className="shop-type">{type}</div>
      </div>
      
      <div className="shop-details">
        <h3 className="shop-name">{name}</h3>
        <div className="shop-location">
          <span>📍</span> {location}
        </div>
        
        {dish && (
          <div className="shop-dish">
            <span>🍽️</span> {dish}
          </div>
        )}
        
        {rating > 0 && (
          <div className="rating">
            <div className="rating-stars">
              {renderStars(rating)}
            </div>
            <span className="rating-text">
              {rating.toFixed(1)} ({reviewCount}件のレビュー)
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}