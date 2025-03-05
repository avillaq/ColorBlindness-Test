import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import "../styles/pages/Tests.css"
import anomaloscopeImage from "../assets/anomaloscope-test.webp"
import cambridgeImage from "../assets/cambridge-test.webp"
import farnsworthD15Image from "../assets/farnsworth-d15-test.webp"
import farnsworthLanternImage from "../assets/farnsworth-lantern-test.webp"
import ishiharaImage from "../assets/ishihara-test.webp"
import kidsImage from "../assets/kids-test.webp"

export const Tests = () => {
  return (
    <div className="tests-container">
      <div className="content-text">
        <p>We use below tests to check color vision deficiency.</p>

      </div>
      <div className="content-tests">
        <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
          <CardHeader className="flex flex-col gap-3">
            <Image
              alt="Ishihara Test logo"
              height={80}
              radius="full"
              src={ishiharaImage}
              width={80}
            />
            <h3>Ishihara Test</h3>
          </CardHeader>
        </Card>
        <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
          <CardHeader className="flex flex-col gap-3">
            <Image
              alt="Farnsworth d-15 logo"
              height={80}
              radius="full"
              src={farnsworthD15Image}
              width={80}
            />
            <h3>Farnsworth D-15</h3>
          </CardHeader>
        </Card>

        <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
          <CardHeader className="flex flex-col gap-3">
            <Image
              alt="Cambridge Test logo"
              height={80}
              radius="full"
              src={cambridgeImage}
              width={80}
            />
            <h3>Cambridge Colour Test</h3>
          </CardHeader>
        </Card>

        <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
          <CardHeader className="flex flex-col gap-3">
            <Image
              alt="Anomaloscope Test logo"
              height={80}
              radius="full"
              src={anomaloscopeImage}
              width={80}
            />
            <h3>Anomaloscope Test</h3>
          </CardHeader>
        </Card>

        <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
          <CardHeader className="flex flex-col gap-3">
            <Image
              alt="Farnsworth Lantern logo"
              height={80}
              radius="full"
              src={farnsworthLanternImage}
              width={80}
            />
            <h3>Farnsworth Lantern Test</h3>
          </CardHeader>
        </Card>

        <Card className="test-card" classNames={{ header: "p-3.5", body: "p-3.5" }} >
          <CardHeader className="flex flex-col gap-3">
            <Image
              alt="Kids Test logo"
              height={80}
              radius="full"
              src={kidsImage}
              width={80}
            />
            <h3>Kids ColorBlindness Test</h3>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
