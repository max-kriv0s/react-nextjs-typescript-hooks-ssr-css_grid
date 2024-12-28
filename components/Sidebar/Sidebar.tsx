import { JSX } from 'react';
import { SidebarProps } from './Sidebar.props';
import { Menu } from '@/app/(site)/components/Menu/Menu';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { getMenu } from '@/api/menu';
import Logo from '@/app/(site)/logo.svg';
import cn from 'classnames';
import styles from './Sidebar.module.css';

export const Sidebar = async ({ className, ...props }: SidebarProps): Promise<JSX.Element> => {
  const firstCategory = TopLevelCategory.Courses;
  const menu = await getMenu(firstCategory);

  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>Поиск</div>
      <Menu menu={menu} firstCategory={firstCategory} />
    </div>
  );
};
