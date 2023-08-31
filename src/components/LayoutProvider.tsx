"use client";

import React from "react";
import { ConfigProvider } from "antd";
import { usePathname } from "next/navigation";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-7-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-shield-user-line",
    },
    {
      name: "Applications",
      path: "/applications",
      icon: "ri-file-list-2-line",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "ri-settings-2-line",
    },
    {
      name: "Saved",
      path: "/saved",
      icon: "ri-save-line",
    },
  ];
  const pathname = usePathname();

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#213555",
              borderRadius: 2,

              // Alias Token
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          {/* if route/pathname is login, register... do not show layout coz its a public page */}

          {pathname === "/login" || pathname === "/register" ? (
            <div>{children}</div>
          ) : (
            <div className="layout-parent">
              <div className="sidebar">
                <div className="logo">
                  {/* sidebar header */}
                  <h1>Gemtunde-Jobs</h1>
                </div>
                <div className="menu-items">
                  {/* sidebar content */}
                  {menuItems.map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                      <div
                        key={index}
                        className={`menu-item ${
                          isActive ? "active-menu-item" : ""
                        }`}
                      >
                        <i className={item.icon}></i>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
                <div>
                  {/* sidebar footer */}
                  <p>
                    <span>Username</span>
                    <span>Logout</span>
                  </p>
                </div>
              </div>
              <div className="body">{children}</div>
            </div>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
};

export default LayoutProvider;
