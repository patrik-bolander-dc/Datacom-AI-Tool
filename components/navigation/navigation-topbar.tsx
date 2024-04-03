import React from 'react'
import Image from 'next/image'

function NavigationTopbar() {
    return (
        <div className="w-full bg-white dark:bg-slate-700 border-b border-gray-200 flex justify-between px-5 py-2 items-center ">
            <Image
                src="/images/DatacomCompanyLogo.png" 
                height={50} 
                width={200} 
                alt="Datacom Company Logo"
                className='p-3 bg-white'
            />
            <div className="w-10 h-10 rounded-full bg-dcBlue flex justify-center items-center text-white border-2 border-blue-300">
                PB
            </div>
        </div>
    )
}

export default NavigationTopbar
// DatacomCompanyLogo.png - 2131 x 397 Aspect ratio: 5.37:1