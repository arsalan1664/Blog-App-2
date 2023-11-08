import { useGetMyBlogsQuery } from "@/features/apiBlogSlice"
import { Button } from "./ui/button"
import { Cross, Pencil, Trash2 } from "lucide-react"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { Input } from "./ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
})



export default function Blog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    
  }





  const userid = localStorage.getItem('id')
  if (!userid) {
    return <p>Pleae login first...</p>
  }
  const { data, isLoading, isError } = useGetMyBlogsQuery(userid)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error fetching data</p>
  }

  const userBlogs = data?.userBlog?.blogs || []


  return (
    <>
      <div className="flex justify-end items-end h-16 pr-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'default'} className=" gap-2">
              <Cross size={16} /><span>Create Blog</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Blog</DialogTitle>
              <DialogDescription>
                Create new blog here. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue=""
                  className="col-span-3"
                />
              </div>
            </div>
            {/* <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can <span>@mention</span> other users and organizations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form> */}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-center ">
        <section className="bg-background ">
          <div className="container px-6 pb-5 mx-auto ">
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-8 md:grid-cols-2">
              {userBlogs.map((item, index) => (
                <div className="lg:flex  rounded-2xl group" key={index}>
                  <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={item.image} alt="" />
                  <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">
                      {item.title}
                    </a>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {item.descryption}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      {item.createdAt}
                    </span>
                    <div className=" hidden group-hover:flex group-hover:justify-end group-hover:gap-4">
                      <Button variant={'outline'} size={'sm'}><Pencil /></Button>
                      <Button variant={'outline'} size={'sm'}><Trash2 /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div></>
  )
}



