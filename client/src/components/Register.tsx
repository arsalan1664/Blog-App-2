import {
    zodResolver
} from "@hookform/resolvers/zod"
import {
    useForm
} from "react-hook-form"
import * as z from "zod"

import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "./ui/card"

import { usePostRegisterMutation } from "@/features/apiSlice"

const formSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    passward: z.string()
})


export function Register() {
    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            passward: ""
        }
    })
    const [postRegister] = usePostRegisterMutation()
    // 2. Define a submit handler.
    function onSubmit(values : z.infer < typeof formSchema >) {
        postRegister(values)
        console.log(values)
    }

    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Register</CardTitle>
                    <CardDescription className="text-center">Enter Your Credentials</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={
                                form.handleSubmit(onSubmit)
                            }
                            className="space-y-5">
                            <FormField control={
                                    form.control
                                }
                                name="username"
                                render={
                                    ({
                                        field
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Username.." {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }/>
                            <FormField control={
                                    form.control
                                }
                                name="email"
                                render={
                                    ({
                                        field
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email.." {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }/>
                            <FormField control={
                                    form.control
                                }
                                name="passward"
                                render={
                                    ({
                                        field
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Passward</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Passward.." {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }/>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
