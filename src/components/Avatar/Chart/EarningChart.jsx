import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sun", earnings: 40 },
  { name: "Mon", earnings: 70 },
  { name: "Tue", earnings: 100 },
  { name: "Wed", earnings: 100 },
  { name: "Thu", earnings: 30 },
  { name: "Fri", earnings: 60 },
  { name: "Sat", earnings: 80 },
];

export function EarningChart() {
  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Earnings</h2>
        <select className="text-sm border rounded p-1">
          <option>Last week</option>
          {/* Add more options here if needed */}
        </select>
      </div>
      <div className="responsive-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="earnings" fill="#000" radius={[16, 16, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <style jsx>{`
        .responsive-container {
          height: 400px;
        }
        @media (max-width: 2047px) {
          .responsive-container {
            height: 380px;
          }
        }
        @media (max-width: 1791px) {
          .responsive-container {
            height: 300px;
          }
        }
        @media (max-width: 1535px) {
          .responsive-container {
            height: 250px;
          }
        }
        @media (max-width: 1279px) {
          .responsive-container {
            height: 400px;
          }
        }
        @media (max-width: 1023px) {
          .responsive-container {
            height: 250px;
          }
        }
        @media (max-width: 767px) {
          .responsive-container {
            height: 180px;
          }
        }
        @media (max-width: 639px) {
          .responsive-container {
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
}
