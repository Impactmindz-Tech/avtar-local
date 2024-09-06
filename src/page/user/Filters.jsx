import HeaderBack from "@/components/HeaderBack";
import FilterMenu from "@/components/UserMenuBar/FilterMenu";
import UserSearch from "@/components/UserTopSearch/UserSearch";

function Filters() {
  return (
    <div className="container">
      <HeaderBack link="/user/dashboard" text="Filters" />
      {/* <UserSearch /> */}
      <div className="w-full sm:w-auto overflow-x-auto">
        <FilterMenu />
      </div>
    </div>
  );
}

export default Filters;
