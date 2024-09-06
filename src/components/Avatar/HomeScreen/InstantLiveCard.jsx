import Images from "@/constant/Images";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function InstantLiveCard() {
  const [switchState, setSwitchState] = useState(true);

  return (
    <div className="flex justify-between items-center squareShadow p-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-danger font-medium sm:text-base">Instant Live</h1>
        <div className="images">
          <img src={Images.info} alt="info" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex">
        <Switch
          id="airplane-mode"
          checked={switchState}
          onCheckedChange={() => setSwitchState(!switchState)}
        />
      </div>
    </div>
  );
}
