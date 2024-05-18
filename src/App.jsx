import "./App.css";
import Header from "./components/layerComponents/Header";
import Footer from "./components/layerComponents/Footer";
import Contents from "./components/pageComponents/Contents";
import useFetch from "./components/layerComponents/useFetch";

const API_URL = "http://localhost:3500/data";
function App() {

  
  const { data, fetchError, isLoading, setData } = useFetch(API_URL);

  const handleDelete = (id) => {
    const deleteRow = data.filter((item) => item.id !== id);
    setData(deleteRow);
  };

  const handleCheck = (id) => {
    const listItems = data.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setData(listItems);
  };

  const handleUpdate = (id, newRole) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, role: newRole } : item
    );
    setData(updatedData);
  };

  return (
    <>
      <div className="App">
        <Header />
        <main>
          {isLoading && <p>Loading Items</p>}
          {fetchError && <p>{`Error:${fetchError}`}</p>}
          {!isLoading && !fetchError && data.length ?(
              <Contents
              handleUpdate={handleUpdate}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              data={data}
              setData={setData}
            /> 
          ) : (
            <p className="py-5">List is empty</p>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;


// npx json-server -p 3500 -w data/db.json