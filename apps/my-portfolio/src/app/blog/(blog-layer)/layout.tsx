import React from "react";

function BlogDetails({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow md:flex space-y-8 md:space-y-0 md:space-x-8 pt-12 md:pt-16 pb-16 md:pb-20">
     {children}
    </div>
  );
}

export default BlogDetails;
