"use client"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useCallback, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { HomePageQuery, HomePageQueryType } from "@/queries/HomePageQuery"

const MakeUser = gql`
    mutation MakeUser($account:String!,$password:String!){
        sigin(account:$account,password:$password){
            token
        }
    }
`
export const UserItem = ({ user }) => {
    return (
        <div>
            {user.account}
        </div>
    )
}
const UserList = () => {
    const {
        data: {
            test,
            userList
        },
        refetch
    } = useSuspenseQuery<HomePageQueryType>(HomePageQuery)
    const form = useForm()
    const [makeUser, {
        loading: makeUserLoading
    }] = useMutation(MakeUser, {
        onCompleted(data, clientOptions) {
            const token = data.sigin.token
            console.log(token)
            refetch()
        },
        onError(error, clientOptions) {
            console.log(error, "the mutation error")
        }
    })

    const [open, setOpen] = useState(false)
    const onSubmit = useCallback(() => {
        const { account, password } = form.getValues()
        makeUser({
            variables: {
                account,
                password
            }
        }).finally(() => {
            setOpen(false)
        })
    }, [])
    const onOpenChange = useCallback((open) => {
        setOpen(open)
    }, [])
    return (
        <div>
            <Dialog
                open={open}
                onOpenChange={onOpenChange}
            >
                <DialogTrigger asChild>
                    <Button onClick={() => onOpenChange(true)}>Create</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create User</DialogTitle>
                        <DialogDescription>
                            Create a account by graphql
                        </DialogDescription>
                    </DialogHeader>
                    <Form
                        {...form}
                    >
                        <FormField
                            control={form.control}
                            name="account"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Account</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your public display name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormDescription>This is your password.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={onSubmit}
                                disabled={makeUserLoading}
                            >
                                {makeUserLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                Save changes
                            </Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
            {userList.map((user) => (
                <UserItem
                    key={user.id}
                    user={user}
                />
            ))}
        </div>
    )
}
export default UserList