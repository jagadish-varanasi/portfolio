import React from "react";
import ProgressBar from "../components/progress-bar";

function BlogDetails({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProgressBar />
      {children}
    </>
  );
}

export default BlogDetails;
