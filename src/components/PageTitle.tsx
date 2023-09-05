import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="my-2">
      <h2 className="text-my-1 ">{title}</h2>
      <hr />
    </div>
  );
};

export default PageTitle;
