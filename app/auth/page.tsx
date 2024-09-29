"use client";

import UiForm, {
  UiFormControl,
  UiFormField,
  UiFormSubmit,
} from "@/components/ui/UiForm";
import { gqlError } from "@/libs/apollo-errors";
import { setCookie } from "@/libs/cookie";
import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

const AuthMutation = gql`
  mutation Auth($account: String!, $password: String!) {
    auth(account: $account, password: $password) {
      token
    }
  }
`;
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

  const onSubmit = useCallback(
    (form: FormData) => {
      auth({
        variables: {
          account: form.get("account"),
          password: form.get("password"),
        },
      });
    },
    [auth]
  );

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-full max-w-md p-8 space-y-8 rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">登录</h2>
          <UiForm onSubmit={onSubmit}>
            <div className="space-y-4">
              <UiFormField name="account">
                <label htmlFor="account" className="block text-sm font-medium">
                  账号
                </label>
                <UiFormControl asChild>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none"
                  />
                </UiFormControl>
              </UiFormField>
              <UiFormField name="password">
                <label htmlFor="password" className="block text-sm font-medium">
                  密码
                </label>
                <UiFormControl asChild>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none"
                  />
                </UiFormControl>
              </UiFormField>
              <UiFormSubmit asChild>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                  disabled={loading}
                >
                  登陆
                </button>
              </UiFormSubmit>
            </div>
          </UiForm>
          <div className="mt-6">
            <h3 className="text-center">其他登录方式</h3>
            <div className="flex justify-center mt-4 space-x-4">
              <button className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
                Gitee
              </button>
              <button className="px-4 py-2 font-bold text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-200">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
