import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import { useTheme } from "@/lib/ThemeContext";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";

export const getStaticProps = async (context) => {
  console.log("@@@@getStaticProps실행중");
  const res = await axios.get("/products");
  const products = res.data.results;

  return { props: { products } };
};

export default function Home({ products }) {
  return (
    <>
      <SearchForm />
      <ProductList className={styles.products} products={products} />
    </>
  );
}
