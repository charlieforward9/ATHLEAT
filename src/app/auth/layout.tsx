// components/Layout.tsx
import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
  children,
  title = "Athleat Authentication",
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
