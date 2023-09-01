import { Card, CardHeader, CardBody, Chip } from '@nextui-org/react'
import { Link } from 'react-router-dom'

const CardMoreInfo = () => {
    return (
        <Card className="h-full">
        <CardHeader className="px-5">
          <h2 className="text-xl font-bold">More Info</h2>
        </CardHeader>
        <CardBody className="gap-4 text-sm">
          <div className="flex flex-wrap gap-2">
            <Chip color="primary">#tag1</Chip>
            <Chip color="secondary">#tag2</Chip>
            <Chip color="success">#tag3</Chip>
            <Chip color="warning">#tag4</Chip>
            <Chip color="danger">#tag5</Chip>
          </div>

          <p className="font-light">
            First txn:{" "}
            <Link to={"/transaction/0xf81c446b19e37525c04fb48ec611d71ed7f22fe91fc70a8518bb1ed0e3e7bc06"} className="hover:underline text-primary font-normal">
              0xf81c446b19e37525c04fb48ec611d71ed7f22fe91fc70a8518bb1ed0e3e7bc06
            </Link>
          </p>
          <p className="font-light">
            Latest txn:{" "}
            <Link to={"/transaction/0xf81c446b19e37525c04fb48ec611d71ed7f22fe91fc70a8518bb1ed0e3e7bc06"} className="hover:underline text-primary font-normal">
              0xf81c446b19e37525c04fb48ec611d71ed7f22fe91fc70a8518bb1ed0e3e7bc06
            </Link>
          </p>
        </CardBody>
      </Card>
    )
}

export default CardMoreInfo