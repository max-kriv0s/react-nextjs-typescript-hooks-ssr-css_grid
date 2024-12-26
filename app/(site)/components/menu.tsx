import { getMenu } from '@/api/menu';

export async function Menu() {
  const firstCategory = 0;
  const menu = await getMenu(firstCategory);
  return (
    <div>
      <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </div>
  );
}
