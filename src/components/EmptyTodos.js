import React from "react";

function EmptyTodos() {
        return (
            <React.Fragment>
            <tr>
            <td />
            <td />
            <td />
          </tr>
          <tr>
            <td className="last-td" />
            <td className="last-td" />
            <td className="last-td" />
          </tr>
            </React.Fragment>
        )
}

export default EmptyTodos;