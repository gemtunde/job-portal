import { Col, Row, Table } from "antd";
import React from "react";

const EmployeeInfo = ({ employeeInfo }: any) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span>Name</span>
            <span>{employeeInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Email</span>
            <span>{employeeInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <span>Phone</span>
            <span>{employeeInfo.phone}</span>
          </div>
        </div>
      </Col>
      <Col span={24}>
        <h2 className="text-md">Career Objective</h2>
        <span>{employeeInfo.careerObjective || "Not Available"}</span>
      </Col>
      <Col span={24}>
        <h2 className="text-md">Skills</h2>
        <Table
          dataSource={employeeInfo.skills}
          columns={[
            { title: "Technology", dataIndex: "technology" },
            { title: "Rating (Out of 100%)", dataIndex: "rating" },
          ]}
          pagination={false}
        />
      </Col>
      <Col span={24}>
        <h2 className="text-md">Education</h2>
        <Table
          dataSource={employeeInfo.education}
          columns={[
            { title: "Qualification", dataIndex: "qualification" },
            { title: "Institution", dataIndex: "institution" },
            { title: "Percentage", dataIndex: "percentage" },
          ]}
          pagination={false}
        />
      </Col>
      <Col span={24}>
        <h2 className="text-md">Experience</h2>
        <Table
          dataSource={employeeInfo.experience}
          columns={[
            { title: "Company", dataIndex: "company" },
            { title: "Role", dataIndex: "role" },
            { title: "Period", dataIndex: "period" },
          ]}
          pagination={false}
        />
      </Col>
    </Row>
  );
};

export default EmployeeInfo;
