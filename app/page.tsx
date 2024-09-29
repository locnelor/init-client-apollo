import DynamicTyper from "@/components/DynamicTyper";

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
        <div className="absolute top-full -mt-10 h-10">⬇️</div>
      </div>

      <div>
        <div>网站数据</div>
        <div>展示网站的数据，例如 文章数、标签数、社区人数、服务器数据等</div>
      </div>
      <div>
        <div>动态</div>
        这里是窝子动态，展示最近添加了什么，发布了什么
      </div>
    </div>
  );
};
export default HomePage;
