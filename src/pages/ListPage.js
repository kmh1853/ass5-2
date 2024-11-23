import React, { useState } from "react";
import ShowList from "../components/ShowList";
import myData from "../my_data.json";

const ListPage = () => {
  const [music] = useState(myData.music);

  return (
    <div className="container mt-4">
      <ShowList music={music} />
    </div>
  );
};

export default ListPage;
