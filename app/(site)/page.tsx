import { Input, Textarea } from '@/components';

export default async function Home() {
  return (
    <main>
      Главная страница
      <div>
        <Input placeholder='test' />
        <Textarea placeholder='test area' />
      </div>
    </main>
  );
}
