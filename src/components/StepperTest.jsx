import { Card, CardBody } from "@heroui/card";

export const StepperTest = ({ steps }) => {
  return (
    <Card classNames={{
      "body": "px-5 py-6"
    }}>
      <CardBody>
        <ol className="relative border-s border-blue-300">
          {
            steps.map((step, index) => (
              <li key={index} className="mb-8 ms-6">
                <span className="absolute flex items-center justify-center w-3 h-3 bg-blue-500 rounded-full -start-1.5 ring-4"></span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))
          }
        </ol>
      </CardBody>
    </Card>

  )
}
