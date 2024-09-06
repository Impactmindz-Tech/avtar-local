import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function NotificationCard({icon,title,stateValue}) {
    const[switchState,setSwitchState]=useState(stateValue)
  return (
    <div className='flex justify-between items-center gap-4 cardShadow p-4 my-5'>
      <div className="icon">
        <img src={icon} alt={icon} />
      </div>
      <div className="flex-1">
      {title}
      </div>
      <div className="switch">
      <Switch id="airplane-mode" checked={switchState}
                      onCheckedChange={()=>setSwitchState(!switchState)} />
      </div>
    </div>
  )
}
