import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import styles from './page.module.css';
import { Footer, HeaderServer, Sidebar, SkipLink, Up } from '@/components';
import RouterListener from '@/components/RouterListener/RouterListener';

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
      <head>
        {/* Подключение preconnect для Яндекс.Метрики */}
        <link rel='preconnect' href='https://mc.yandex.ru' />
        <link rel='dns-prefetch' href='https://mc.yandex.ru' />
      </head>
      <body className={`${natoSans.variable}`}>
        {/* <ErrorButton label='Вызвать ошибку' /> */}
        <RouterListener />
        <div className={styles.wrapper}>
          <SkipLink />
          <HeaderServer className={styles.header} />
          <Sidebar className={styles.sidebar} />
          <main className={styles.body} id='content' tabIndex={0} role='main'>
            {children}
          </main>
          <Footer className={styles.footer} />
          <Up />
        </div>
      </body>
    </html>
  );
}
