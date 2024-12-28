import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import styles from './page.module.css';
import { Footer, Header, Sidebar } from '@/components';

const natoSans = Noto_Sans({
  variable: '--font-noto-sans-kr',
  display: 'swap',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${natoSans.variable}`}>
        <div className={styles.wrapper}>
          <Header className={styles.header} />
          <Sidebar className={styles.sidebar} />
          <div className={styles.body}>{children}</div>
          <Footer className={styles.footer} />
        </div>
      </body>
    </html>
  );
}
