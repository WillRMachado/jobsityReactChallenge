import React from "react";

function day(props: { date: any; }) {
  const { date } = props;
  console.log("p", props.date.getDay());
  return (
    <div
      style={{
        width: "100%",
        minHeight: "1000",
        backgroundColor: "green",
        // width: "9vw",
        padding: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
      }}
    >
      {date.getDate() + "/" + date.getMonth()}
    </div>
  );
}

export default day;
