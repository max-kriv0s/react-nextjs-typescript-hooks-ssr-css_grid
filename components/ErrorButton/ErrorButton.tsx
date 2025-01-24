'use client';

import { JSX, useState } from 'react';

interface ErrorButtonProps {
  a?: { b?: JSX.Element }; // Предполагаем, что `b` — это JSX элемент
  label: string; // Строка для текста кнопки
}

export default function ErrorButton(props: ErrorButtonProps) {
  const [raiseError, setRaiseError] = useState(false);

  if (raiseError) {
    // "a" is undefined so "props.a.b" will result in an error
    return props.a!.b!;
  } else {
    return <button onClick={() => setRaiseError((error) => !error)}>{props.label}</button>;
  }
}
