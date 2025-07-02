import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head /> 
      {/* 폰트불러온다, 구글 태그매니저 불러올때 */}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
