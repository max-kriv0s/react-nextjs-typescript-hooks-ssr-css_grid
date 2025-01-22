'use client';

import styles from './Menu.module.css';
import { JSX, KeyboardEvent, useState } from 'react';
import { FirstLevelMenuItem, MenuItem, PageItem } from '@/interfaces/menu.interfaces';
import cn from 'classnames';
import Link from 'next/link';
import { MenuProps } from './Menu.props';
import { usePathname } from 'next/navigation';
import { firstLevelMenu } from '@/helpers/helpers';
import { motion, useReducedMotion, Variants } from 'framer-motion';

export function Menu({ menu: inputMenu, firstCategory }: MenuProps): JSX.Element {
  const [menu, setMenu] = useState<MenuItem[]>(inputMenu);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();

  const shouldReduceMotion = useReducedMotion();

  const pathname = usePathname();

  const variants: Variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
          },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren: Variants = {
    visible: {
      opacity: 1,
      height: 29,
    },
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      height: 0,
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu(
      menu.map((m) => {
        if (m._id.secondCategory === secondCategory) {
          setAnnounce(m.isOpened ? 'closed' : 'opened');
          m.isOpened = !m.isOpened;
        }
        return m;
      })
    );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles['first-level-list']}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`}>
              <div
                className={cn(styles['first-level'], {
                  [styles['first-level-activ']]: m.id === firstCategory,
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles['second-block']}>
        {menu.map((m) => {
          if (m.pages.map((p) => p.alias).includes(pathname.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                className={styles['second-level']}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={cn(styles['second-level-block'])}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map((page) => (
      <motion.li key={page._id} variants={variantsChildren}>
        <Link
          tabIndex={isOpened ? 0 : -1}
          href={`/${route}/${page.alias}`}
          className={cn(styles['third-level'], {
            [styles['third-level-active']]: `/${route}/${page.alias}` === pathname,
          })}
          aria-current={`/${route}/${page.alias}` === pathname ? 'page' : false}
        >
          {page.category}
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {announce && (
        <span role='log' className='visually-hidden'>
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
}
