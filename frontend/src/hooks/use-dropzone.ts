import { useState, ChangeEvent } from 'react';

export const useDropzone = () => {

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    
    const isFile = event.target.files && event.target.files[0];

    if (isFile) {
      setFile(isFile);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(isFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview("");
  }

  return {file, filePreview, handleFileChange, removeFile}

};
