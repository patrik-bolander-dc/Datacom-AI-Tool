import FileUploader from '@/components/file-upload/file-upload-component';
import SingleFileUploader from '@/components/file-upload/single-file-upload';
import React from 'react'



function Tool2() {
  return (
    <div className='w-full flex justify-center'>
      <SingleFileUploader 
      label="Max File Size: 1GB" 
      labelAlt="Accepted File Types: png, jpeg"/>
    </div>
  )
}

export default Tool2