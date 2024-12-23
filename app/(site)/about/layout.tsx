export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={{ border: '1px solid black' }}>{children}</div>;
}
