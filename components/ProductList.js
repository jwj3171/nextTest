import Link from "next/link";
import styles from "./ProductList.module.css";
import StarRating from "./StarRating";
import Image from "next/image";

export default function ProductList({ className = "", products }) {
  return (
    <ul className={`${styles.productList} ${className}`}>
      {products?.map((product) => (
        <li key={product.id}>
          <Link className={styles.product} href={`/products/${product.id}`}>
            <div className={styles.image}>
              <Image
                fill
                src={product.imgUrl}
                alt={product.name}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width:1020px) 33vw,330px"
              />
            </div>

            <div className={styles.content}>
              <div>
                <span className={styles.name}>{product.name}</span>
                <div className={styles.prices}>
                  <span className={styles.originalPrice}>
                    {product.price.toLocaleString()}원
                  </span>
                  {product.salePrice.toLocaleString()}원
                </div>
              </div>
              <hr className={styles.divider} />
              <div>
                <div className={styles.starRating}>
                  <StarRating value={product.starRating} />
                  {product.starRatingCount.toLocaleString()}
                </div>
                <div className={styles.likeCount}>
                  ♥{product.likeCount.toLocaleString()}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
