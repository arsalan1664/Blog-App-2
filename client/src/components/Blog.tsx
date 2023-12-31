import { useGetAllBlogsQuery } from "@/features/apiBlogSlice"
import Banner from "./Banner"
import { Progress } from "./ui/progress"

function Blog() {
    const { data, isLoading, isError } = useGetAllBlogsQuery()
    if (isLoading) {
        return <p className="min-h-[75%] flex flex-col gap-2 items-center justify-center"><p>Loading..</p><Progress value={50} className="w-1/3" />
        </p>
    }
    if (isError) {
        return <p>Error fetching data</p>
    }
    console.log(data?.blog);
    return (
        <>
            <Banner />
            <div className="flex items-center justify-center">
                <section className="bg-background">
                    <div className="container px-6 py-5 mx-auto ">
                        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-8 md:grid-cols-2">
                            {data?.blog.map((item: any, index: number) => (
                                <div className="lg:flex" key={index}>
                                    <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={item.image} alt="" /><div className="flex flex-col justify-between py-6 lg:mx-6">
                                        <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                                            {item.title}
                                        </a>
                                        <span className="text-sm text-gray-500 dark:text-gray-300">
                                            {item.descryption}
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
        </>
    )
}

export default Blog
