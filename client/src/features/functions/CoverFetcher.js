
import axios from "axios";

export const CoverFetcher =  async (book)=>
{
    try {
        const bookCovers = await Promise.all(book.coverImages.map(async x => {
            const response = await axios.get(`http://localhost:5000/api/books/cover/${x}`,{responseType:'blob'});
            return {src:URL.createObjectURL(response.data),fileID:x}; 
        }))
        
        return bookCovers;
    } catch (error) {
        console.error("Error fetching cover images:", error);
        return [];
    }
}