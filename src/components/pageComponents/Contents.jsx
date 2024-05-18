import { useState } from "react";
import ContentList from "./ContentList";
import Search from "./Search";
import { useRef, useEffect } from "react";
import apiRequest from "../layerComponents/apiRequest";
import useFetch from "../layerComponents/useFetch";

function Contents({ handleCheck, handleUpdate, handleDelete, data, setData }) {
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const API_URL = "http://localhost:3500/data";

  const { fetchError,setFetchError, isLoading} = useFetch(API_URL);

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const addItem = async(role) => {
    // const id = data.length ? data[data.length - 1].id + 1 : 1;
    const id = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const addNewItem = { id, role, checked: false };
    const listItem = [...data, addNewItem];
    console.log(listItem, "list");
    setData(listItem);
    setSearch("");

    const postOptions = {
      method:"POST",
      header:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }

    const result = await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
  };

  return (
    <>
      <main>
        <form className="d-flex p-2" onSubmit={handleSubmit}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Add Items"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button onClick={(e) => inputRef.current.focus()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-file-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z" />
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
            </svg>
          </button>
        </form>

        <Search search={search} setSearch={setSearch} />

        <ul>
          {data &&
            data
              .filter((item) =>
                item.role.toLowerCase().includes(search.toLowerCase())
              )
              .map((items) => (
                <ContentList
                  key={items.id}
                  handleCheck={handleCheck}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  items={items}
                />
              ))}
        </ul>
      </main>
    </>
  );
}

export default Contents;
