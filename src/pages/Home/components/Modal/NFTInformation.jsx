import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";

import { Img } from "react-image";

import ReactCardFlip from "react-card-flip";

import { useState, Suspense } from "react";

const PreviewImage = ({ urls, alt }) => {
  const [flip, setFlip] = useState(false);
  return (
    <Suspense>
      <div className="flex justify-center w-full">
        <div className="w-5/6 sm:w-1/2 md:w-2/3  nsition-all duration-300 hover:scale-110 hover:-translate-y-5">
          <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
            <Img
              onClick={() => setFlip(!flip)}
              src={urls}
              alt={alt}
              className="w-full"
              loader={<Loader />}
            />
            <Img
              onClick={() => setFlip(!flip)}
              src={urls}
              alt={alt}
              className="w-full"
              loader={<Loader />}
            />
          </ReactCardFlip>
        </div>
      </div>
    </Suspense>
  );
};

const Loader = () => {
  return (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
};

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
