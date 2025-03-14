import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { useNavigate } from 'react-router-dom';
import "../styles/pages/TestList.css"
import anomaloscopeImage from "../assets/anomaloscope-test.webp"
import cambridgeImage from "../assets/cambridge-test.webp"
import farnsworthD15Image from "../assets/farnsworth-d15-test.webp"
import farnsworthLanternImage from "../assets/farnsworth-lantern-test.webp"
import ishiharaImage from "../assets/ishihara-test.webp"
import kidsImage from "../assets/kids-test.webp"

export const TestList = () => {
  const navigate = useNavigate();
  return (
    <div className="test-list-container">
      <div className="content-text">
        <p>We use below tests to check color vision deficiency.</p>
      </div>
      <div className="content-tests">
        <Card
          isPressable
          className="test-card"
          classNames={{ base: "w-48 h-44 justify-center", header: "px-3.5" }}
          onPress={() => navigate("/tests/ishihara-test")} >
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
        <Card
          isPressable
          className="test-card"
          classNames={{ base: "w-48 h-44 justify-center", header: "px-3.5" }}
          onPress={() => navigate("/tests/farnsworth-d-15-test")} >
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

        <Card
          isPressable
          className="test-card"
          classNames={{ base: "w-48 h-44 justify-center", header: "px-3.5" }}
          onPress={() => navigate("/tests/cambridge-test")} >
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

        <Card
          isPressable
          className="test-card"
          classNames={{ base: "w-48 h-44 justify-center", header: "px-3.5" }}
          onPress={() => navigate("/tests/anomaloscope-test")} >
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

        <Card
          isPressable
          className="test-card"
          classNames={{ base: "w-48 h-44 justify-center", header: "px-3.5" }}
          onPress={() => navigate("/tests/farnsworth-lantern-test")} >
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

        <Card
          isPressable
          className="test-card"
          classNames={{ base: "w-48 h-44 justify-center", header: "px-3.5" }}
          onPress={() => navigate("/tests/kids-colorblindness-test")} >
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
