'use client';

import { JSX, KeyboardEvent, useState } from 'react';
import styles from './SkipLink.module.css';
import cn from 'classnames';

export const SkipLink = (): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);

  const skinContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      const contentElement = document.getElementById('content');
      if (contentElement) {
        contentElement.focus();
        // contentElement.scrollIntoView({ behavior: 'smooth' }); // Прокрутка к контенту
      }
    }
    setIsSkipLinkDisplayed(false);
  };

  return (
    <a
      onFocus={() => {
        setIsSkipLinkDisplayed(true);
      }}
      tabIndex={1}
      className={cn(styles['skip-link'], {
        [styles.displayed]: isSkipLinkDisplayed,
      })}
      onKeyDown={skinContentAction}
    >
      Сразу к содержанию
    </a>
  );
};
