import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputFile from "../subComponents/fileInputs";
import { DevTool } from "@hookform/devtools";
import './addBook.css'; // Import the CSS file
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
    const { register, control, handleSubmit, formState, watch } = useForm();
    const { errors } = formState;
    const theBook = watch("theBook");
    const covers = watch("covers");
    const [coversDisplay, setCoversDisplay] = useState([]);
    const [bookDisplay, setBookDisplay] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (covers) {
            const files = covers.map(x => URL.createObjectURL(x));
            setCoversDisplay(files);
        }
    }, [covers]);

    useEffect(() => {
      if(theBook)
        setBookDisplay(URL.createObjectURL(theBook));
    }, [theBook]);

    const onSubmit =  async (data) => {

      const formData = new FormData();
      formData.append("title",data.title);
      formData.append("author",data.author);
      formData.append("genre",data.genre);
      formData.append("theBook",data.theBook);
      data.covers.forEach(cover => {
        formData.append("covers",cover)
      });


        try {
          const res = await axios.post('http://localhost:5000/api/books', formData,
            {
              headers:{"Content-Type":"multipart/form-data"}
            }
          )

          navigate("/",{state:{message:res.data.message}})
        } catch (error) {
            console.log("Error adding the book")
            console.log(error);
        }
    };

    return (
        <>
            <form className="add-book-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className="form-title">Add a New Book</h2>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        id="title"
                        className="form-input"
                        {...register("title", {
                            required: {
                                value: true,
                                message: "Book title is required"
                            }
                        })}
                        placeholder="Title"
                    />
                    {errors.title?.message && <p className="error-message">{errors.title?.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                        id="author"
                        className="form-input"
                        {...register("author")}
                        placeholder="Author"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genreSelect" className="form-label">Genre</label>
                    <select
                        id="genreSelect"
                        className="form-select"
                        {...register("genre", {
                            validate: (val) => {
                                return val !== "" || "You must select a genre";
                            }
                        })}
                    >
                        <option value="">Select genre</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="drama">Drama</option>
                        <option value="comedy">Comedy</option>
                    </select>
                    {errors.genre?.message && <p className="error-message">{errors.genre?.message}</p>}
                </div>

                <InputFile control={control} name="covers" label="Upload covers" allowMultiple={true} type="image/*" />
                <div className="form-group">
                    <InputFile control={control} name="theBook" label="Upload the book" allowMultiple={false} type=".pdf" />
                    {bookDisplay && (
                        <button type="button" className="verify-button" onClick={() => window.open(bookDisplay)}>
                            Verify uploaded book
                        </button>
                    )}
                </div>
                <button type="submit" className="submit-button">Add Book</button>
            </form>
            {/* <DevTool control={control} /> */}
            <div className="covers-display">
                {coversDisplay && coversDisplay.map(x => (
                    <img src={x} alt="" key={x} className="cover-image" />
                ))}
            </div>
        </>
    );
}
