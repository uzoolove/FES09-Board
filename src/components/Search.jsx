import Submit from "@components/Submit";
import { useState } from "react";
import PropTypes from 'prop-types';

Search.propTypes = {
  onClick: PropTypes.func
};

function Search({ onClick }){
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <form>
      <input className="dark:bg-gray-600" type="text" autoFocus value={ keyword } onChange={ handleChange } />
      <Submit onClick={ (e) => { e.preventDefault(); onClick(keyword); }}>검색</Submit>
    </form>
  );
}

export default Search;