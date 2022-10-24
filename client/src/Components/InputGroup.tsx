import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import BsInputGroup from "react-bootstrap/InputGroup";

type AppProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  error: string;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
};

const InputGroup = ({
  type,
  name,
  label,
  placeholder,
  value,
  error,
  onChangeHandler,
}: AppProps) => {
  return (
    <div className="reg-form">
      <Row className="justify-content-md-center">
        <Col xs={2}>
          <BsInputGroup.Text>{label}</BsInputGroup.Text>
        </Col>
        <Col xs={10}>
          <Form.Control
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChangeHandler}
          />
          <p>{error}</p>
        </Col>
      </Row>
    </div>
  );
};

export default InputGroup;
