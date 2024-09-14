import React from 'react';

const LayoutFormulario = ({ title, children }) => {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Astro description" />
        <meta name="viewport" content="width=device-width" />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/763c79dbc1.js"
          crossOrigin="anonymous"
        ></script>
        <title>{title}</title>
      </head>
      <body className="bg-white xl:m-0 xl:overflow-y-hidden xl:p-0 xl:h-full sm:h-screen p-20 sm:p-14 h-screen flex justify-center sm:w-auto m-0">
        {children}
      </body>
    </html>
  );
};

export default LayoutFormulario;
