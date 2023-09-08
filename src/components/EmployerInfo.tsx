import { Col, Divider, Row } from "antd";
import React from "react";

const EmployerInfo = ({ employerInfo }: any) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>Company Name</span>
            <span>{employerInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Establisment Year</span>
            <span>{employerInfo?.establismentYear || "No Available"}</span>
          </div>
          <div className="flex justify-between">
            <span>Company Size</span>
            <span>{employerInfo?.companySize || "Not available"} </span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span>{employerInfo?.email || "Not Available"}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone</span>
            <span>{employerInfo?.phone || "Not Available"}</span>
          </div>
          <div className="flex justify-between">
            <span>Website</span>
            <span>{employerInfo?.website || "Not Available"}</span>
          </div>
          <div className="flex justify-between">
            <span>Address</span>
            <span>{employerInfo?.address || "Not Available"}</span>
          </div>
        </div>
      </Col>
      <Col span={24}>
        <Divider />
        <h3>About {employerInfo?.name}</h3>
        <span>{employerInfo?.about || "Not available"}</span>
      </Col>
    </Row>
  );
};

export default EmployerInfo;
