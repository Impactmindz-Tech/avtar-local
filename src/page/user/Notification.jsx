import NotificationCard from '@/components/Cards/NotificationCard'
import HeaderBack from '@/components/HeaderBack'
import Images from '@/constant/Images'
 
function Notification() {
  return (
    <div className="container">
      <HeaderBack link="/user/profile" text={"Notifications"} />
      <div className="containts">
        <NotificationCard icon={Images.multiMessages} title={"Message"} stateValue={false}/>
        <NotificationCard icon={Images.correct} title={"Approved Tour"} stateValue={true}/>
        <NotificationCard icon={Images.closeCircle} title={"Cancelled Tours"} stateValue={false}/>
        <NotificationCard icon={Images.locationNew} title={"New Tour in Your Area"} stateValue={true}/>
        <NotificationCard icon={Images.support} title={"Support"} stateValue={true}/>
      </div>
    </div>
  )
}

export default Notification
