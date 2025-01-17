import { JSX } from 'react';
import { HeaderServerProps } from './HeaderServer.props';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';

export const HeaderServer = async ({ className, ...props }: HeaderServerProps): Promise<JSX.Element> => {
  const sidebarElement = await Sidebar({ className, ...props });
  return (
    <>
      <Header sidebar={sidebarElement} className={className} {...props} />
    </>
  );
};
