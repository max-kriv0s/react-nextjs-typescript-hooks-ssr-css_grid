import { getMenu } from '@/api/menu';
import { getPage } from '@/api/page';
import { getProducts } from '@/api/product';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Курсы',
};

export async function generateStaticParams() {
  const firstCategory = 0;
  const menu = await getMenu(firstCategory);
  return menu.flatMap((item) => item.pages.map((page) => ({ alias: page.alias })));
}

export default async function PageCourses({ params }: { params: Promise<{ alias: string }> }) {
  const { alias } = await params;
  const page = await getPage(alias);
  const products = await getProducts(page!.category);
  if (!page) {
    notFound();
  }
  return (
    <div>
      <div>{page.title}</div>
      <div>{page.category}</div>
      <div>{products && products.length}</div>
    </div>
  );
}
