import React from 'react'

function Search({search,setSearch}) {
  return (
    <>
    <form className='' onSubmit={(e)=>e.preventDefault()}>
       <input 
       type='text'
       placeholder='Search Items'
       id='search'
       role='searchBox'
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
       />
    </form>
    </>
  )
}

export default Search