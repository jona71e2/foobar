import React from "react";

export default function TapLevel({ taps }) {
  //Link to CSS-tricks article about progress-element: https://css-tricks.com/html5-progress-element/
  //console.log(taps);
  return (
    <>
      {taps.map((tap) => {
        return (
          <>
            <label style={{ display: "block" }} for="tap-level">
              {tap.level}/{tap.capacity}
            </label>
            <progress
              id="tap-level"
              max={tap.capacity}
              value={tap.level}
            ></progress>
          </>
        );
      })}
    </>
  );
}
