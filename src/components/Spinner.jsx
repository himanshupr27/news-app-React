import React from 'react';
import loading from "./loading1.gif"

function Spinner(){
    return (
      <div className="text-center">
        <img src={loading} alt="loading_gif" />
      </div>
    );
  }

export default Spinner;
