"use client";

import React, { useState, useEffect } from "react";
import { ConfigProvider, message } from "antd";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "@/redux/usersSlice";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(true);
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
  const dispatch = useDispatch();
  //get users from state
  const { currentUser } = useSelector((state: any) => state.users);
  //currentuser
  const getCurrentUser = async () => {
    try {
      const response = await axios.get("/api/users/currentuser");
      dispatch(setCurrentUser(response.data.data));
      console.log(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [pathname]);

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
                  {showSidebar && <h1>Gem-Tunde</h1>}
                  {!showSidebar && (
                    <i
                      className="ri-menu-2-line"
                      onClick={() => setShowSidebar(!showSidebar)}
                    ></i>
                  )}
                  {showSidebar && (
                    <i
                      className="ri-close-line"
                      onClick={() => setShowSidebar(!showSidebar)}
                    ></i>
                  )}
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
                        style={{
                          justifyContent: showSidebar ? "flex-start" : "center",
                        }}
                      >
                        <i className={item.icon}></i>
                        <span>{showSidebar && item.name}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="user-info">
                  {/* sidebar footer */}
                  {showSidebar && (
                    <div className="flex flex-col">
                      <span>{currentUser?.name}</span>
                      <span>{currentUser?.email}</span>
                    </div>
                  )}
                  <i className="ri-logout-box-r-line"></i>
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
