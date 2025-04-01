import React from "react";

function BlogDetails({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-screen flex">
        <main className="grow px-6 mt-[40px]">
          <div className="w-full h-full max-w-[1072px] mx-auto flex">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default BlogDetails;
