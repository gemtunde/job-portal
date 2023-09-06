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
          <textarea />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Job Type"
          name="jobType"
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
        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please enter your location",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Experience"
          name="experience"
          rules={[
            {
              required: true,
              message: "Please enter your experience",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Work Mode"
          name="workMode"
          rules={[
            {
              required: true,
              message: "Please select a work mode",
            },
          ]}
        >
          <select>
            <option value="remote"> Remote</option>
            <option value="office"> Office</option>
            <option value="hybrid"> Hybrid</option>
          </select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Salary From"
          name="salaryFrom"
          rules={[
            {
              required: true,
              message: "Please enter your salary range",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Salary To"
          name="salaryTo"
          rules={[
            {
              required: true,
              message: "Please select your salary range",
            },
          ]}
        >
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label="Notice Period"
          name="noticePeriod"
          rules={[
            {
              required: true,
              message: "Please enter your notice period",
            },
          ]}
        >
          <input type="text" placeholder="2 weeks" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default JobPostForm;
