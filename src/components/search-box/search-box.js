import { useState } from "react";
import SearchBar from "material-ui-search-bar";
import { withRouter } from "react-router";
function SearchBox(props) {
    const [searchStr, setSearchStr] = useState('');
    const handleSearch = () => {
        if (searchStr) props.history.push(`/list/${searchStr.split(' ').join(':')}`);
        else props.history.push('/');
    }
    return (
        <SearchBar
            onChange={(newValue) => { setSearchStr(newValue) }}
            onRequestSearch={() => handleSearch()}
            value={searchStr}
            style={{
                width: '100%'
            }}
        />
    )
}

export default SearchBox;