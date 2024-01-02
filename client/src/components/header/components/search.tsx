import { MdOutlineSearch } from "react-icons/md";

import headerStyles from '../../../styles/header.module.css';

const Search = () => {
    return (
        <div className="w-4/12 relative flex justify-between align-center">
            <input type="text" className="w-full rounded-lg border-0 outline-0 p-2 h-10 text-lg" placeholder="SEARCH" />
            <MdOutlineSearch className={headerStyles.iconSearch} size={32} />
        </div>
    )
}

export default Search