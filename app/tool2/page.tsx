import FileUploader from '@/components/file-upload/file-upload-component';
import SingleFileUploader from '@/components/file-upload/single-file-upload';
import React from 'react'

// const url = "/api/upload";
const url = 'https://rekognition-backend.azurewebsites.net/analyze'

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => (
  <div className="flex flex-col items-center justify-between gap-4 min-h-52 bg-zinc-800 w-full max-w-2xl py-10 px-10 rounded-xl h-fit">
    {children}
  </div>
)

function Tool2() {
  return (
    <div className='w-full flex justify-center'>

      {/* <Container>
        <h1 className="text-2xl font-bold">File Uploader</h1>
        <FileUploader
          url={url}
          acceptedFileTypes={[
            "image/png",
            "image/jpeg",
          ]}
          maxFileSize={100} // in MB
          label="Max File Size: 1GB" 
          labelAlt="Accepted File Types: png, jpeg"
        />
      </Container> */}
      <SingleFileUploader />
    </div>
  )
}

export default Tool2