import React from 'react';

const PostLayout = ({ title, children, id, idarea }) => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Astro description" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="../../public/img/IconBoteritos.png" />
        <script src="https://kit.fontawesome.com/763c79dbc1.js" crossOrigin="anonymous"></script>
        <title>{title}</title>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100..700;1,100..700&display=swap');
            body {
              font-family: 'Josefin Slab', serif;
            }
          `}
        </style>
      </head>
      <body className="bg-[#F5F6FA]" data-project-id={id} data-idarea={idarea}>
        {children}
      </body>
    </>
  );
};

export default PostLayout;
