import React from "react";

export default function LoadingWidget(props) {
  return (
    <>
      {props.loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
