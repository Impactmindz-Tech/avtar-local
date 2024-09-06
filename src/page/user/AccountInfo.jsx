import CardThreeSection from "@/components/Avatar/Card/CardThreeSection";
import HeaderBack from "@/components/HeaderBack";
import DeleteAccountModal from "@/components/Modal/DeleteAccountModal";
import FreezeAccountModal from "@/components/Modal/FreezeAccountModal";
import Images from "@/constant/Images";
import { useState } from "react";

function AccountInfo() {
    const [freezeAccountModalState,setFreezeAccountModalState]=useState(false)
    const [deleteAccountModalState,setDeleteAccountModalState]=useState(false)
  return (
    <div className="container">
      <HeaderBack link="/user/profile" text={"Account Info"} />
      <CardThreeSection icon={Images.info} link={"/user/edit-profile"} title={"Account Info"} desc={"Click on arrow to update your account information."} />
      <div onClick={()=>setFreezeAccountModalState(true)}>

      <CardThreeSection icon={Images.slash}  title={"Freeze Account"} desc={"Click on arrow to Freeze or Unfreeze your account."} />
      </div>
      <div onClick={()=>setDeleteAccountModalState(true)}>

      <CardThreeSection icon={Images.trash}  title={"Delete Account"} desc={"Click on arrow to delete your account permanently."} />
      </div>



      <FreezeAccountModal freezeAccountModalState={freezeAccountModalState} setFreezeAccountModalState={setFreezeAccountModalState}/>
      <DeleteAccountModal deleteAccountModalState={deleteAccountModalState} setDeleteAccountModalState={setDeleteAccountModalState}/>
    </div>
  );
}

export default AccountInfo;
