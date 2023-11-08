import { useGetMyBlogsQuery } from "@/features/apiBlogSlice"
import { Button } from "./ui/button"
import { Cross,  Pencil, Trash2 } from "lucide-react"

function Blog() {
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
        <Button variant={'default'} className=" gap-2">
          <Cross size={16} /><span>Create Blog</span>
        </Button>
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

export default Blog
