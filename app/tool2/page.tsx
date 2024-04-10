import SingleFileUploader from '@/components/file-upload/single-file-upload';
import React from 'react'


function Tool2() {
  return (
    <div className='w-full flex justify-center mt-5'>
      <SingleFileUploader 
        label="Max File Size: no limit" 
        labelAlt="Accepted File Types: png, jpeg"/>
    </div>
  )
}

export default Tool2