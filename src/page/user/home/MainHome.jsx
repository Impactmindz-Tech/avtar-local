import { useState, useEffect } from "react";
import { FadeLoader } from "react-spinners";
import { getAllExperience } from "@/utills/service/mainHomeService/MainHomeServices";
import HomeExperienceList from "./HomeExperienceList";
import InfiniteScroll from "react-infinite-scroll-component";

const MainHome = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async (page) => {
    try {
      setLoading(true);
      const response = await getAllExperience({ pg: page, items_per_page: itemsPerPage });
      if (response?.success) {
        const newData = response.data;
        if (newData.length < itemsPerPage || !response.has_more) {
          setHasMore(false);
        }

        setData((prevData) => (page === 1 ? newData : [...prevData, ...newData]));
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load data. Please try again later.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(currentPage);
  }, []);

  const fetchMoreData = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchDashboardData(nextPage);
  };

  return (
    <>
      <h1 className="px-4 lg:text-sm">All Available Tours</h1>
      <div className="overflow-hidden">
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-4 overflow-hidden">
              <FadeLoader color="#000" height={5} width={5} />
            </div>
          }
          // endMessage={<p className="text-grey-800 text-center py-2">All experiences loaded.</p>}
        >
          <div className="my-10 grid grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 xl:grid-cols-2 gap-4 lg:my-2 hidden-scrollbar overflow-hidden">
            {data.length !== 0 ? (
              data.map((product) => <HomeExperienceList key={product._id} product={product} />)
            ) : !loading && !error ? (
              <h1 className="font-medium text-sm">No Data Found</h1>
            ) : error ? (
              <h1 className="font-medium text-sm text-red-500">{error}</h1>
            ) : null}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default MainHome;
