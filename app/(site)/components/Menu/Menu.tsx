'use client';

import styles from './Menu.module.css';
import { JSX, useState } from 'react';
import { FirstLevelMenuItem, MenuItem, PageItem } from '@/interfaces/menu.interfaces';
import cn from 'classnames';
import Link from 'next/link';
import { MenuProps } from './Menu.props';
import { usePathname } from 'next/navigation';
import { firstLevelMenu } from '@/helpers/helpers';

export function Menu({ menu: inputMenu, firstCategory }: MenuProps): JSX.Element {
  const [menu, setMenu] = useState<MenuItem[]>(inputMenu);

  const pathname = usePathname();

  const openSecondLevel = (secondCategory: string) => {
    setMenu(
      menu.map((m) => {
        if (m._id.secondCategory === secondCategory) {
          m.isOpened = !m.isOpened;
        }
        return m;
      })
    );
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
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
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles['second-block']}>
        {menu.map((m) => {
          if (m.pages.map((p) => p.alias).includes(pathname.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div className={styles['second-level']} onClick={() => openSecondLevel(m._id.secondCategory)}>
                {m._id.secondCategory}
              </div>
              <div
                className={cn(styles['second-level-block'], {
                  [styles['second-level-block-opened']]: m.isOpened,
                })}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((page) => (
      <Link
        key={page._id}
        href={`/${route}/${page.alias}`}
        className={cn(styles['third-level'], {
          [styles['third-level-active']]: `/${route}/${page.alias}` === pathname,
        })}
      >
        {page.category}
      </Link>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
}
