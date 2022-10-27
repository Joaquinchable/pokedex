import React from "react";
const { useState } = React;

const Searchbar = (props) => {
  const { onSearch } = props;
  const [search, setSearch] = useState("");
  const [dis, setDis] = useState(true)

  const onChange = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (e.target.value.length === 0) {
      onSearch(null);
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    onSearch(search);
    setDis(false)
  };

  return (
    <div className={`${ dis == false ? 'displaNone' : 'dis'}` }>
      <div className="searchbar">
        <form onSubmit={onClick} >
          <input placeholder="Buscar pokemon" onChange={onChange}/>
        </form>
      </div>
      <div className="searchbar-btn">
        <button onClick={onClick}>Buscar</button>
      </div>
    </div>
  );
};

export default Searchbar;
