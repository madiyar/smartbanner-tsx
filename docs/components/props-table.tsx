import React from "react";
import { PROPS } from "../lib/api";
import { Icon } from "./ui";

export function PropsTable() {
  const [query, setQuery] = React.useState("");

  const q = query.trim().toLowerCase();
  const rows = PROPS.filter(
    (prop) =>
      !q ||
      prop.name.toLowerCase().includes(q) ||
      prop.description.toLowerCase().includes(q) ||
      prop.group.toLowerCase().includes(q),
  );

  return (
    <>
      <div className="search">
        <Icon name="search" size={16} />
        <input
          type="search"
          placeholder="Filter props"
          value={query}
          aria-label="Filter props"
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            aria-label="Clear filter"
            onClick={() => setQuery("")}
          >
            <Icon name="close" size={14} />
          </button>
        )}
      </div>

      <div className="table-wrap">
        <table className="props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((prop) => (
              <tr key={prop.name} id={`prop-${prop.name}`}>
                <td>
                  <code>{prop.name}</code>
                </td>
                <td>
                  <code>{prop.type}</code>
                </td>
                <td>{prop.default ? <code>{prop.default}</code> : "—"}</td>
                <td>{prop.description}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">
                  No props match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
