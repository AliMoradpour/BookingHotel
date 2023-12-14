import { createContext, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const BookmarkListProvider = ({ children }) => {
  const [currentBookmark, setcurrentBookmark] = useState(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    setcurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setIsLoadingCurrentBookmark(false);
      setcurrentBookmark(data);
    } catch (error) {
      toast.error(error.message);
      setcurrentBookmark(data);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        isLoadingCurrentBookmark,
      }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkListProvider;

export const useBookmark = () => useContext(BookmarkContext);
