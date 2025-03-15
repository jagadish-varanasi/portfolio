import React from "react";
import ProgressBar from "../../components/progress-bar";

function BlogDetails({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ProgressBar />
      {children}
    </div>
  );
}

export default BlogDetails;
