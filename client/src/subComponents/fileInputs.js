import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';

export default function InputFile({ control, name,label,allowMultiple,type }) {

    const validateFile = (files) => {

        if(!files || files.length === 0)
            return true

        if (type === "image/*" && name === "covers" && files.length > 5) {
                return "Max number of files can't exceed 5";
        }
        return true; // Return true if all validations pass
    };
    
   
    
    return (
        <Controller
            control={control}
            name={name}
            rules = {{
                validate:validateFile
            }}
            render={({ field: { onChange, onBlur, ref }, fieldState: { error } }) => (
                <div>
                    <label htmlFor={name}>
                        {label} <FontAwesomeIcon icon={faUpload} />
                    </label>
                    <FontAwesomeIcon icon={faEye} />
                    <FontAwesomeIcon icon={faTrash}   />
                    <input
                       
                        accept={type}
                        type="file"
                        // hidden
                      
                        multiple = {allowMultiple}// Allow multiple file selection
                        onChange={(e) => {
                            if(allowMultiple){
                                const files = Array.from(e.target.files);
                                if(files.length > 5){
                                    alert("Only 5 covers are allowed")
                                    e.target.value = "";
                                }else
                                {
                                    onChange(files); // Pass the array of files
                                }
                            }
                            else{
                                onChange(e.target.files[0])
                            }
    

                        
                        }}
                        onBlur={onBlur} // Register the blur event
                        ref={ref} // Reference for the input
                        id={name}

                        
                    />
                    {error && <p style={{ color: 'red' }}>{error.message}</p>} {/* Display error message */}

                </div>

               
            )}
        />
    );
}
