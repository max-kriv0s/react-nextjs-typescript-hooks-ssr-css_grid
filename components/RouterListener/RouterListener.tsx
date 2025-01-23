'use client';

import { Router } from 'next/router';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';

export default function RouterListener() {
  Router.events.on('routeChangeComplete', (url: string) => {
    if (typeof window !== 'undefined') {
      ym('hit', url); // Для Яндекс.Метрики
    }
  });

  return <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version='2' />;
}
