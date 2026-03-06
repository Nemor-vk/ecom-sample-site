import React from 'react'
import RichTxtEditor from '../richTxtEditor/RichTxtEditor';

const ProductDesc = ({content}:{content: string}) => {
  return (
    <div className='text-sm md:text-base rounded-sm'>
      <h2 className='font-bold text-xl'>Product Description</h2>
      <RichTxtEditor content={content} isEditable={false} className="inline-block text-foreground/80 capitalize mt-4 w-full min-h-[200px] border-0 rounded-none" />
    </div>
  );
}

export default ProductDesc