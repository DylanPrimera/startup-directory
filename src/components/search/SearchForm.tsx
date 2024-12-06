import Form from "next/form";
import { SearchFormReset } from "./SearchFormReset";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
    query?: string
}

export const SearchForm = ({query}:Props) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset/>}
        <button type="submit" className="search-btn text-white">
            <IoSearchOutline size={20}/>
        </button>
      </div>
    </Form>
  );
};
