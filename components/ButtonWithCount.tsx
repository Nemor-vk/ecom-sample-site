import React from 'react'
import { Button } from './ui/button'
import { Minus, Plus } from 'lucide-react'

const ButtonWithCount = ({count, increaseCount, decreaseCount}:{count:number, increaseCount:()=>void, decreaseCount:()=>void}) => {
  return (
    <Button variant={'outline'} size={'container'} asChild onClick={(event)=> event.preventDefault()}>
        <div className=''>
            <div className=' cursor-pointer p-1' onClick={decreaseCount}>
                <Minus className='' size={18}/>
            </div>
            <span>{count}</span>
            <div className='cursor-pointer p-1' onClick={increaseCount}>
            <Plus className='' size={18}/>
            </div>
        </div>
    </Button>
  )
}

export default ButtonWithCount