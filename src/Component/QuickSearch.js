import React from "react";
import QuickSearchitem from "./QuickSearchItem";

const QuickSearch = () => {
  return (
    <div>
      <div class="container-fluid">
        <h1 className="h1">Quick Searches</h1>
        <h3 className="h3">Discover restaurants by the type of meals</h3>
        <br />
        <div class="row  justify-content-around gap-1">
          <QuickSearchitem />
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
