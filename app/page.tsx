import getViewer from "@/hooks/auth/getViewer";
import PageRender from "./pageRender";

const HomePage = async () => {
  const user = await getViewer();

  return <PageRender user={user} />;
};

export default HomePage;
