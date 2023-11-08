import { useGetMyBlogsQuery } from "@/features/apiBlogSlice"

function Blog() {
  const userid  = localStorage.getItem('id') 
  if(!userid){
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
    <div className="flex items-center justify-center">
      <section className="bg-background">
        <div className="container px-6 py-5 mx-auto">
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            {userBlogs.map((item, index) => (
              <div className="lg:flex" key={index}>
                <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={item.image} alt="" />
                <div className="flex flex-col justify-between py-6 lg:mx-6">
                  <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white">
                    {item.title}
                  </a>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {item.description}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {item.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
