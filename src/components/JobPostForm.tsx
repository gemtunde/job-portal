import { Col, Form, Row } from "antd";
import React from "react";

const JobPostForm = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item
          label="Job Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a job title",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Job Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter a job description",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Job Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select a job type",
            },
          ]}
        >
          <select>
            <option value="fulltime"> Full Time</option>
            <option value="partime"> Part Time</option>
            <option value="contract"> Contract</option>
          </select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Location" name="location">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Experience" name="experience">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Work Mode" name="workMode">
          <select>
            <option value="fulltime"> Remote</option>
            <option value="partime"> Office</option>
            <option value="contract"> Hybrid</option>
          </select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Salary From" name="salaryFrom">
          <input type="number" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Salary To" name="salaryTo">
          <input type="number" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Notice Period" name="noticePeriod">
          <input type="text" placeholder="2 weeks" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default JobPostForm;
