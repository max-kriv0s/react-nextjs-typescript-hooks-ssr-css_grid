import { API } from '@/app/api';
import { MenuItem } from '@/interfaces/menu.interfaces';
import { TopLevelCategory } from '@/interfaces/page.interface';

export async function getMenu(firstCategory: number = TopLevelCategory.Courses): Promise<MenuItem[]> {
  const res = await fetch(API.topPage.find, {
    method: 'POST',
    body: JSON.stringify({ firstCategory }),
    headers: new Headers({ 'content-type': 'application/json' }),
    next: { revalidate: 10 },
  });
  return res.json();
}
