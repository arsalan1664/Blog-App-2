import { useDeleteBlogMutation, useGetMyBlogsQuery } from "@/features/apiBlogSlice"
import { Button } from "./ui/button"
import { Cross, Trash2 } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { BlogForm } from "./BlogForm"
import { Toaster } from "./ui/toaster"
import { Progress } from "./ui/progress"
import { toast } from "./ui/use-toast"




export default function Blog() {

  const userid = localStorage.getItem('id')
  if (!userid) {
    return <p>Pleae login first...</p>
  }
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id : string )=>{
    try {
      const result:any = await deleteBlog(id)
      console.log(result.data.success);
      if(result.data.success){
        toast({
          title: "Deleted Successfully"
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  const { data, isLoading, isError } = useGetMyBlogsQuery(userid)

  if (isLoading) {
    return <p className="min-h-[75%] flex flex-col gap-2 items-center justify-center"><p>Loading..</p><Progress value={33} className="w-1/3"/>
    </p>
  }

  if (isError) {
    return <p>Error fetching data</p>
  }

  const userBlogs = data?.userBlog?.blogs || []
  console.log(userBlogs);
  


  return (
    <div className="min-h-[75%]">
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
            <BlogForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center justify-center ">
        <section className="bg-background ">
          <div className="container px-6 pb-5 mx-auto ">
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-8 md:grid-cols-2">
              {userBlogs.map((item:any) => (
                <div className="lg:flex  rounded-2xl group" key={item._id}>
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
                      {/* <Button variant={'outline'} size={'sm'}><Pencil /></Button> */}
                      <Button onClick={()=>handleDelete(item._id)} variant={'destructive'} size={'sm'}><Trash2 /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Toaster />
        </section>
      </div>
    </div>
  )
}



