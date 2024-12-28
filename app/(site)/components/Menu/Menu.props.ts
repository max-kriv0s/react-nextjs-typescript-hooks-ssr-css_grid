import { MenuItem } from '@/interfaces/menu.interfaces';
import { TopLevelCategory } from '@/interfaces/page.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}
