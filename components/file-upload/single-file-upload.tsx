"use client"
import { useEffect, useState } from "react";

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    file
    console.log(file)
  }, [file])
  


  const handleUpload = async () => {
    if (file) {
       console.log("Uploading file...");
       console.log(file)

      const formData = new FormData();
      formData.append("image", file); // file.name

      const url = 'https://rekognition-backend.azurewebsites.net/analyze'

      // Display the values
      for (const value of formData.entries()) {
        console.log('item:', value);
      }

      try {
        const result = await fetch(url, {
          method: "POST",
          body: formData,
          mode: 'no-cors',
          headers: new Headers({
            "Content-Type": "multipart/form-data",
            // 'accept': 'image/*',
          })
        });

        // const data = await result;
        console.log(result);
        // const imageObjectURL = URL.createObjectURL(data);
        // setImg(imageObjectURL);


        // console.log(data);
      } catch (error) {
        console.log('here in error')
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button className='bg-gray-900 rounded-lg' onClick={handleUpload}>Upload a file</button>}

      {img !== '' && (
        <img src={img} alt="result image" />
      )

      }

    </>
  );
};

export default SingleFileUploader;