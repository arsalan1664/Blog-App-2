"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { usePostBlogMutation } from "@/features/apiBlogSlice"

const FormSchema = z.object({
  title: z.string(),
  descryption: z.string(),
  image: z.string(),
  user: z.string(),
})

export function BlogForm() {

  const [postBlog, { isError, isSuccess, error}] = usePostBlogMutation();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      descryption: "",
      image: "",
      user: `${localStorage.getItem('id')}`
    },
  })

function  onSubmit (data: z.infer<typeof FormSchema>) {
    postBlog(data)
    console.log(data);
  }

  if ( isSuccess) {
    toast({
      title: "Submited Successfully"
    })
  }
  if (isError) {
    toast({
      title: `${JSON.stringify(error)}`
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descryption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descryption</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
