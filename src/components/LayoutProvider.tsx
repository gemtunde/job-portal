import React from "react";
import { ConfigProvider } from "antd";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#00b96b",
              borderRadius: 5,

              // Alias Token
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
};

export default LayoutProvider;
