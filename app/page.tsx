import DynamicTyper from "@/components/DynamicTyper";
import Link from "next/link";
import { PropsWithChildren, useMemo } from "react";

const RecentQuotesRender = () => {
  const recentQuotes = useMemo(() => {
    return [
      {
        author: "阔哥",
        creator: "豪哥",
        createdAt: "2020-12-30",
        content: "阔哥牛逼阔哥牛逼",
        image: "",
        note: "阔哥太特么牛逼了",
      },
    ];
  }, []);
  return (
    <div>
      {recentQuotes.map((quote, index) => (
        <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-300">
                {quote.author}
              </h3>
              <p className="text-sm text-gray-400">创建者: {quote.creator}</p>
            </div>
            <p className="text-sm text-gray-400">{quote.createdAt}</p>
          </div>
          <p className="text-gray-300 mb-4">{quote.content}</p>
          {quote.image && (
            <img
              src={quote.image}
              alt="语录配图"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          )}
          {quote.note && (
            <p className="text-sm text-gray-400 italic">备注: {quote.note}</p>
          )}
        </div>
      ))}
    </div>
  );
};
const Heading = ({ children, href }: PropsWithChildren<{ href: string }>) => {
  return (
    <h2 className="text-2xl font-bold mb-6 flex gap-4">
      <div>{children}</div>
      <Link href={href}>
        <div className="inline-block cursor-pointer text-blue-300 rounded-full hover:text-blue-600 transition-colors">
          More
        </div>
      </Link>
    </h2>
  );
};
const HomePage = () => {
  return (
    <div>
      <div className="h-screen min-h-96 relative flex justify-center items-center">
        <div className="text-center">
          <div style={{ fontSize: 32 }} className="font-bold py-20">
            Bug窝子
          </div>
          <DynamicTyper />
        </div>
        <div className="absolute top-full -mt-10 h-10">more</div>
      </div>

      <div className="mt-10">
        {/* <h2 className="text-2xl font-bold mb-6">最新文章</h2> */}
        <Heading href="/bug">最新文章</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-300">
              如何优雅地处理JavaScript中的异步操作
            </h3>
            <p className="text-gray-300 mb-4">
              探讨Promise、async/await等现代异步编程技巧，让你的代码更加清晰易读。
            </p>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              阅读更多
            </a>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-300">
              React Hooks深入浅出
            </h3>
            <p className="text-gray-300 mb-4">
              从基础到进阶，全面解析React Hooks的使用方法和最佳实践。
            </p>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              阅读更多
            </a>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2 text-blue-300">
              聊聊Web性能优化的那些事
            </h3>
            <p className="text-gray-300 mb-4">
              从前端到后端，分享一些实用的Web性能优化技巧和工具。
            </p>
            <a href="#" className="text-blue-400 hover:text-blue-300">
              阅读更多
            </a>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href={"/bug"}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            查看所有文章
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <Heading href="/">最近语录</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentQuotesRender />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
