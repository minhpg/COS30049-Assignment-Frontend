import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";


import PreviewImage from "../../../../components/PreviewImage";

const NFTInformation = () => {
  return (
    <>
    <PreviewImage alt="blabla" urls={[`1371527.png`]} />
      <Table
        hideHeader
        aria-label="Example table with dynamic content"
        removeWrapper
      >
        <TableHeader>
          <TableColumn>key</TableColumn>
          <TableColumn>value</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Name</TableCell>
            <TableCell className="text-right font-light">
              Noodles Grimskithang
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Description</TableCell>
            <TableCell className="text-right font-light">
              先生女士们！! 认识我的人都管我叫 Noodles
              Grimskithang！若你也喜欢煎饼果子，那我们就有话可聊啦！
              喵闲时光，你会看见本喵总是在 做拉筋运动 或者偷窥隔壁邻居。
              让我们一起创造喵星奇迹！
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default NFTInformation;
