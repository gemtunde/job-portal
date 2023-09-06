"use client";

import React, { useState, useEffect } from "react";
import { ConfigProvider, message } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrentUser } from "@/redux/usersSlice";
import Loader from "./Loader";
import { SetLoading } from "@/redux/loadersSlice";
//import { Router } from "next/router";
import { employeeMenuItems, employerMenuItems } from "@/constants";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  //sidebar menu-items

  const [menuItems, setMenuItems] = useState(employeeMenuItems);

  //navigation router
  const router = useRouter();

  //pathname
  const pathname = usePathname();
  const dispatch = useDispatch();
  //get users from state
  const { currentUser } = useSelector((state: any) => state.users);

  //get loading state
  const { loading } = useSelector((state: any) => state.loaders);

  //  call currentuser
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      const isEmployer = response.data.data.userType === "employer";
      if (isEmployer) {
        // const tempIems: any = menuItems;
        // tempIems[2].name = "Posted Jobs";
        // tempIems[2].path = "/jobs";
        setMenuItems(employerMenuItems);
      }

      dispatch(setCurrentUser(response.data.data));
      console.log(response.data.data);
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      getCurrentUser();
    }
  }, [pathname]);

  //logout
  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/users/logout");
      dispatch(setCurrentUser(null));
      message.success("Logout success");

      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };

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
          {loading && <Loader />}
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
                        onClick={() => router.push(item.path)}
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
                  <i
                    className="ri-logout-box-r-line"
                    onClick={onLogout}
                    style={{ color: " #ff6666" }}
                  ></i>
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
