import React from "react";

const CardDataStats = ({ title, total, rate, levelUp, levelDown, children }) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        {children}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-800">
            {total}
          </h4>
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-semibold ${
            levelUp ? "text-green-500" : ""
          } ${levelDown ? "text-red-500" : ""}`}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-green-500"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0L12 6H8v6H4V6H0L6 0z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-red-500"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L0 6h4V0h4v6h4L6 12z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
