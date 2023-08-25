import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import React, { FC, PropsWithChildren } from 'react';
import { PageProps } from '@/types';

export const PageWrapper: FC<PropsWithChildren<PageProps>> = ({
  header,
  children,
  footer,
}) => {
  return (
    <div className="overflow-hidden">
      <Header data={header} />
      <main>{children}</main>
      <Footer data={footer} />
    </div>
  );
};
