import ProductList from "@/components/ProductList";
import SearchForm from "@/components/SearchForm";
import axios from "@/lib/axios";
import { useTheme } from "@/lib/ThemeContext";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const res = await axios.get("/products");
    const nextProducts = res.data.results;
    setProducts(nextProducts);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      
      <SearchForm />
      <ProductList className={styles.products} products={products} />
    </>
  );
}
