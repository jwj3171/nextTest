import Container from "@/components/Container";
import Dropdown from "@/components/Dropdown";
import Header from "@/components/Header";
import { useTheme } from "@/lib/ThemeContext";
import styles from "@/styles/Setting.module.css";

export default function Setting() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <h1 className={styles.title}>설정</h1>
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>테마 설정</h2>
      </section>
      <Dropdown
        name="theme"
        value={theme}
        onChange={(name, value) => setTheme(value)}
        options={[
          { label: "라이트", value: "light" },
          { label: "다크", value: "dark" },
        ]}
      />
    </>
  );
}
