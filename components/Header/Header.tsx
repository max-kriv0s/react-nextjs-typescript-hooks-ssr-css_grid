'use client';

import { JSX, useEffect, useState } from 'react';
import { HeaderProps } from './Header.props';
import cn from 'classnames';
import styles from './Header.module.css';
import Logo from '@/app/(site)/logo.svg';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';

export const Header = ({ sidebar, className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const pathname = usePathname();

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  const variants: Variants = {
    opened: { opacity: 1, x: 0, transition: { stiffness: 20 } },
    closed: { opacity: shouldReduceMotion ? 1 : 0, x: '100%' },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon
        appearance='white'
        icon='menu'
        onClick={() => {
          setIsOpened(true);
        }}
      />
      <motion.div
        className={styles['mobile-menu']}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        {sidebar}
        <ButtonIcon
          className={styles['menu-close']}
          appearance='white'
          icon='close'
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
