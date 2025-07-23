import React from 'react'
import RichTxtEditor from '../richTxtEditor/RichTxtEditor';

const ProductDesc = ({content}:{content: string}) => {
  return (
    <div className='text-sm'>
      <RichTxtEditor content={content} isEditable={false} className="inline-block capitalize bg-card p-5 w-full min-h-[200px] border-0 rounded-none" />
    </div>
  );
}

export default ProductDesc