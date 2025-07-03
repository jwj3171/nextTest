import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import styles from "@/styles/Product.module.css";
import SizeReviewList from "@/components/SizeReviewList";
import StarRating from "@/components/StarRating";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Head from "next/head";
import Image from "next/image";

export const getStaticPaths = async () => {
  const res = await axios.get("/products");
  const products = res.data.results;
  const paths = products.map((product) => {
    return {
      params: {
        id: String(product.id),
      },
    };
  });
  return {
    paths,
    fallback: true, // false or "blocking" //true 파라미터에 없으면  getStaticProps 에서 만들어서 화면 보여줌-> 로딩처리가필요함
  };
};

export const getStaticProps = async (context) => {
  console.log("@@@ items_id getStaticProps실행중");
  const productId = context.params["id"]; //getStaticPaths 에서 매핑된 아이디만 가능
  let product;

  try {
    const res = await axios.get(`/products/${productId}`);
    product = res.data;
  } catch {
    return { notFound: true }; // items/bad-id 같은 이상한 id에도 에러가 아닌 404페이지로 보냄
  }

  return { props: { product } };
};

export default function Product({ product }) {
  const [sizeReviews, setSizeReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  async function getSizeReviews(targetId) {
    const res = await axios.get(`/size_reviews/?product_id=${targetId}`);
    const nextSizeReviews = res.data.results ?? [];
    setSizeReviews(nextSizeReviews);
  }

  useEffect(() => {
    if (!id) return;
    getSizeReviews(id);
  }, [id]);

  //getStaticPaths fallback:true일때
  //로딩필요 - 데이터 없어서 불러오는동안 로딩처리 - 로딩스피너 자리
  if (!product) return <div>로딩중입니다....</div>;

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <h1 className={styles.name}>
        {product.name}
        <span className={styles.englishName}>{product.englishName}</span>
      </h1>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src={product.imgUrl}
            alt={product.name}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제품 정보</h2>
            <div className={styles.info}>
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <th>브랜드 / 품번</th>
                    <td>
                      {product.brand} / {product.productCode}
                    </td>
                  </tr>
                  <tr>
                    <th>제품명</th>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <th>가격</th>
                    <td>
                      <span className={styles.salePrice}>
                        {product.price.toLocaleString()}원
                      </span>{" "}
                      {product.salePrice.toLocaleString()}원
                    </td>
                  </tr>
                  <tr>
                    <th>포인트 적립</th>
                    <td>{product.point.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>구매 후기</th>
                    <td className={styles.starRating}>
                      <StarRating value={product.starRating} />{" "}
                      {product.starRatingCount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th>좋아요</th>
                    <td className={styles.like}>
                      ♥{product.likeCount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천</h2>
            <SizeReviewList sizeReviews={sizeReviews ?? []} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
          </section>
        </div>
      </div>
    </>
  );
}
