"use client";

import { gqlError } from "@/libs/apollo-errors";
import { setCookie } from "@/libs/cookie";
import { gql, useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useCallback } from "react";

const AuthMutation = gql`
  mutation Auth($account: String!, $password: String!) {
    auth(account: $account, password: $password) {
      token
    }
  }
`;
type AuthVariables = {
  account: string;
  password: string;
};
const AuthPage = () => {
  const [auth, { loading }] = useMutation(AuthMutation, {
    onCompleted({ auth: { token } }) {
      setCookie("token", token);
      window.location.href = "/";
    },
    onError(error) {
      gqlError(error);
    },
  });

  const onFinish = useCallback(
    (variables: AuthVariables) => {
      auth({
        variables,
      });
    },
    [auth]
  );

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item required name="account">
          <Input placeholder="账号" />
        </Form.Item>
        <Form.Item required name="password">
          <Input type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} block htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthPage;
