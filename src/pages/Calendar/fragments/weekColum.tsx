import React from "react";

import Day from "./day";

function weekColumn(props: any) {
  const { dayTitle } = props;
  return (
    <td style={{}}>
      {dayTitle}
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
      <Day />
    </td>
  );
}

export default weekColumn;
