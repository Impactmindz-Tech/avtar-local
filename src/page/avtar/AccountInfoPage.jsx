import CardThreeSection from "@/components/Avatar/Card/CardThreeSection";
import HeaderBack from "@/components/HeaderBack";
import DeleteAccountModal from "@/components/Modal/DeleteAccountModal";
import Images from "@/constant/Images";
import { useState } from "react";

function AccountInfoPage() {
  const [deleteAccountModalState, setDeleteAccountModalState] = useState(false);

  return (
    <>
      <div className="container">
        <HeaderBack link="/avatar/profile" text={"Account Info"} />
        <CardThreeSection
          icon={Images.info}
          link={"/avatar/edit-profile"}
          title={"Account Info"}
          desc={"Click on arrow to update your account information."}
        />
        <div onClick={() => setDeleteAccountModalState(true)}>
          <CardThreeSection
            icon={Images.trash}
            title={"Delete Account"}
            desc={"Click on arrow to delete your account permanently."}
          />
        </div>
      </div>

      <DeleteAccountModal
        deleteAccountModalState={deleteAccountModalState}
        setDeleteAccountModalState={setDeleteAccountModalState}
      />
    </>
  );
}

export default AccountInfoPage;
