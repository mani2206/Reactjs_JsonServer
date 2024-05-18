import React from "react";

function ContentList({items,handleCheck,handleDelete,handleUpdate}) {
   
  return (
    <>
      <li key={items.id}>
        <input
          type="checkbox"
          autoFocus
          onChange={(e) => handleCheck(items.id)}
          checked={!!items.checked}
        />
        <p
          className=""
          style={items.checked ? { textDecoration: "line-through" } : null}
          onDoubleClick={() => handleCheck(items.id)}
        >
          {items.role}
        </p>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(items.id)}
        >
          Delete
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            const newRole = prompt("Enter new role:", items.role);
            console.log(newRole, "newrole");
            newRole && newRole ? handleUpdate(items.id, newRole) : null;
          }}
        >
          Update
        </button>
      </li>
    </>
  );
}

export default ContentList;
