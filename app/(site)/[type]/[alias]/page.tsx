import { getMenu } from '@/api/menu';
import { getPage } from '@/api/page';
import { getProducts } from '@/api/product';
import { firstLevelMenu } from '@/helpers/helpers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TopPageComponent } from './components';
import Error404 from '../../not-found';

// export const metadata: Metadata = {
//   title: 'Курсы',
// };

export async function generateMetadata({ params }: { params: Promise<{ alias: string }> }): Promise<Metadata> {
  const { alias } = await params;
  const page = await getPage(alias);

  const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${alias}`;

  return {
    title: page?.metaTitle,
    description: page?.metaDescription,
    openGraph: {
      title: page?.metaTitle,
      description: page?.metaDescription,
      url: fullUrl,
      locale: 'ru_RU',
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  let paths: { type: string; alias: string }[] = [];
  for (const m of firstLevelMenu) {
    const menu = await getMenu(m.id);
    paths = paths.concat(
      menu.flatMap((item) =>
        item.pages.map((page) => ({
          type: m.route,
          alias: page.alias,
        }))
      )
    );
  }

  return paths;
}

export default async function TopPage({ params }: { params: Promise<{ alias: string; type: string }> }) {
  const { alias, type } = await params;

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === type);
  if (!firstCategoryItem) {
    notFound();
  }

  const page = await getPage(alias);
  if (!page) {
    notFound();
  }

  const products = await getProducts(page.category);

  if (!page || !products) {
    return <Error404 />;
  }

  return (
    <>
      <TopPageComponent page={page} products={products} firstCategory={firstCategoryItem.id} />
    </>
  );
  // (products && (
  //   <div>
  //     <div>{page.title}</div>
  //     <div>{page.category}</div>
  //     <div>{products && products.length}</div>
  //   </div>
  //   )
  // );
}
