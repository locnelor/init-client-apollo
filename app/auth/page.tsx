"use client"
import AuthBox from "./AuthBox";
import { gql, useMutation } from "@apollo/client";
import { UiFormData } from "@/components/ui/UiForm";
import { gqlError } from "@/lib/apollo-error";
import { setCookie } from "@/lib/cookie";
import { useCallback } from "react";
import Image from "next/image";
import UiDivider from "@/components/ui/UiDivider";
import UiButton from "@/components/ui/UiButton";

const AuthMutation = gql`
    mutation Auth($phone:String!,$password:String!){
        phoneAuthPassword(phone:$phone,password:$password){
            id
            token
        }
    }
`
const Auth = ({ searchParams: { back = "/" } }) => {
    const [auth, { loading }] = useMutation(AuthMutation, {
        onCompleted({ phoneAuthPassword: { token } }) {
            setCookie("token", token);
            window.location.href = back
        },
        onError(error) {
            gqlError(error)
        },
    })
    const onSubmit = useCallback((variables: UiFormData) => {
        auth({
            variables
        })
    }, []);
    return (
        <div>
            <AuthBox
                loading={loading}
                onSubmit={onSubmit}
            />
            <UiDivider>其他登录方式</UiDivider>
            <div className="flex gap-3 justify-center mt-5">
                <div className="cursor-pointer">
                    <a
                        href={`/auth/gitee`}
                    >
                        <UiButton>
                            <Image width={20} height={20} src="/Logo_gitee_light.svg" alt="gitee" />
                            gitee快速登录
                        </UiButton>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Auth