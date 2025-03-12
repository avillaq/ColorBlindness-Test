import { Card, CardBody } from "@heroui/card";

export const DescriptionGridTest = ({ gridItems }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-4 gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-4 ">
      {
        gridItem.map((item, index) => (
          <Card key={index} classNames={{ "body": "p-4" }}>
            <CardBody>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </CardBody>
          </Card>
        ))
      }
    </div>
  )
}
