import React, { useState } from 'react';

type Props = {};

export const ImageList = (props: Props) => {
  const [imageList, setImageList] = useState([1, 2, 3, 4, 5]);
  return (
    <ul className="flex overflow-x-scroll gap-0.5 rounded-ss-[4px] rounded-es-[4px] -mr-4 ">
      {imageList.map((image, index) => (
        <li key={index} className="min-w-[144px] w-[144px] h-[168px] bg-gray-500"></li>
      ))}
    </ul>
  );
};
