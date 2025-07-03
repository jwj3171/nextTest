import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import styles from "@/styles/Search.module.css";
import Head from "next/head";

export const getServerSideProps = async (context) => {
  // console.log(context);
  const { q } = context.query;
  const res = await axios.get(`/products/?q=${q}`);
  const products = res.data.results;

  return { props: { products, q } };
};

export default function Search({ products, q }) {
  return (
    <div>
      <Head>
        <title>codeitmall {q} 검색결과</title>
      </Head>
      <SearchForm initialValue={q} />
      <h2 className={styles.title}>
        <span className={styles.keyword}>{q}</span> 검색 결과
      </h2>
      <ProductList className={styles.productList} products={products} />
    </div>
  );
}
