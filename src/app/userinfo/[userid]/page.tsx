"use client";
import EmployeeInfo from "@/components/EmployeeInfo";
import EmployerInfo from "@/components/EmployerInfo";
import PageTitle from "@/components/PageTitle";
import { SetLoading } from "@/redux/loadersSlice";
import { message } from "antd";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>([]);
  //dispatch
  const dispatch = useDispatch();

  //get user id from params
  const { userid } = useParams();

  //get user info
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/api/users/${userid}`);
      message.success(response.data.data);
      setUserInfo(response.data.data);
      console.log("user info data is", response.data.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    fetchUserInfo();
    //console.log("usertype is", fetchUserInfo());
  }, []);
  return (
    userInfo && (
      <div>
        <PageTitle
          title={`${
            userInfo.userType === "employer" ? "Employer" : "Employee"
          } Info`}
        />
        {userInfo.userType === "employer" ? (
          <EmployerInfo employerInfo={userInfo} />
        ) : (
          <EmployeeInfo employeeInfo={userInfo} />
        )}
      </div>
    )
  );
};

export default UserInfo;
