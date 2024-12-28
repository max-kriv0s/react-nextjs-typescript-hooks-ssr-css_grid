import { firstLevelMenu } from '@/helpers/helpers';

export async function generateStaticParams() {
  return firstLevelMenu.map((m) => ({ type: m.route }));
}

export default async function Type({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  return <>Type - {type}</>;
}
