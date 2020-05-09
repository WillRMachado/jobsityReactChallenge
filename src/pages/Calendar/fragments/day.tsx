import React from "react";

function day(props: { date: any; currentMonth: any }) {
  const { date, currentMonth } = props;
  console.log("p", props.date.getDay());
  return (
    <button
      style={{
        width: "100%",
        minHeight: "1000",
        backgroundColor: date.getMonth() === currentMonth ? "green" : "black",
        padding: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
      }}
      onClick={() => window.alert("k")}
    >
      {date.getDate() + "/" + date.getMonth()}
    </button>
  );
}

export default day;
