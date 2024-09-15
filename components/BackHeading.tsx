import { Divider } from "antd";
import BackButton from "./BackButton";
import Heading from "./Heading";

const BackHeading = ({ title = "" }) => {
  return (
    <div>
      <Heading>
        <BackButton />
        <div>{title}</div>
      </Heading>
      <Divider />
    </div>
  );
};
export default BackHeading;
