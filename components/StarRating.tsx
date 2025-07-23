import { Star, StarHalf } from 'lucide-react'
import React from 'react'

const StarRating = (props : {color?:string, rating:number, strokeColor?:string, size?:number}) => {

    const rating = props.rating;
    const color = props.color || '#d8d800';
    const strokeColor = props.strokeColor || '#d8d800';
    const size = props.size || 20;

  return (
    <div className='flex gap-0.5 items-center'>
       {Array.from({length:5},(_, index) => (
        <div className='flex relative' key={index}>
        <StarHalf size={size} fill={rating >= index + 0.1 ? color : 'transparent'} color={strokeColor}/>
        <StarHalf size={size} fill={rating >= index + 1 ? color : 'transparent'} color={strokeColor} className="transform scale-x-[-1] absolute top-0 left-0"/>
        </div>
       )) }
    </div>
  )
}

export default StarRating