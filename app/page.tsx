'use client';

import { Htag, Button, P, Tag, Rating } from '@/components';
import Logo from '../public/vercel.svg';
import { useState } from 'react';

export default function Home() {
  const [rating, setRating] = useState<number>(4);

  return (
    <main>
      Главная страница
      <div>
        <Logo width={100} height={100} />
        <Htag tag='h1'>Заголовок</Htag>
        <Button appearance='primary' arrow='right'>
          Кнопка
        </Button>
        <Button appearance='ghost' arrow='down'>
          Кнопка
        </Button>
        <P size='l'>Большой</P>
        <P>Средний</P>
        <P size='s'>Маленький</P>
        <Tag size='s'>Ghost</Tag>
        <Tag size='m' color='red'>
          Red
        </Tag>
        <Tag size='s' color='green'>
          Green
        </Tag>
        <Tag color='primary'>Primary</Tag>
        <Rating rating={rating} isEditable={true} setRating={setRating} />
      </div>
    </main>
  );
}
