import React from "react";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

function ForwardButton(props: any) {
  const { onClick } = props;
  return (
    <>
      <div onClick={() => onClick()}>b</div>
    </>
  );
}

function BackwardButton(props: any) {
  const { onClick } = props;
  return (
    <>
      <div onClick={() => onClick()}>b</div>
    </>
  );
}

export { ForwardButton, BackwardButton };
