import React, { useEffect, useState } from 'react';
import DeviceCard from '@/components/DeviceCard';
import { allDevicesDetails } from '@/utills/service/avtarService/getDevicesServices';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileDevice = () => {
  const [loader, setLoader] = useState(false);
  const [activeTab, setActiveTab] = useState('iphone');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [iphoneData, setIphoneData] = useState([]);
  const [androidData, setAndroidData] = useState([]);
  const tabs = ['iphone', 'android'];

  const fetchDevicesData = async () => {
    setLoader(true);
    try {
      const res = await allDevicesDetails();
      if (res?.success) {
        const devices = res.data || [];

        // Separate devices into iPhone and Android
        const iphoneDevices = devices.filter(device => device.deviceType === 'iphone');
        const androidDevices = devices.filter(device => device.deviceType === 'android');

        setIphoneData(iphoneDevices);
        setAndroidData(androidDevices);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDevicesData();
  }, []);

  useEffect(() => {
    setSelectedDevice(null); // Reset selected device when the tab changes
  }, [activeTab]);

  // selected Devices value get in this
// console.log(selectedDevice)
  // Choose data based on the active tab
  const data = activeTab === 'android' ? androidData : iphoneData;

  return (
    <>
      {loader && <Loader />}
      <div className="max-w-[80%] h-[90vh] mx-auto lg:max-w-full relative">
        <h1 className="text-grey-700 font-medium text-md">
          Please select your device
        </h1>

        <div className="my-4">
          <div className="lg:overflow-x-auto lg:overflow-y-auto">
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-md w-[50%] font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-primaryColor-900 text-primaryColor-900 font-bold'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-2 overflow-y-auto max-h-[63vh] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 px-2">
              {data.map((item, index) => (
                <DeviceCard
                  name={item.model}
                  key={item._id}  // Use unique _id as key
                  isSelected={selectedDevice === item.model}
                  onSelect={() => setSelectedDevice(item.model)}
                />
              ))}
            </div>
          </div>
        </div>

        <Link to="/" className="w-[50vw]">
          <div className="btn min-w-full bg-black py-3 text-white text-center rounded-sm">
            <button>Next</button>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MobileDevice;
