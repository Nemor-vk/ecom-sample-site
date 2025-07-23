import { Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import StarRating from '../StarRating'

const SellerDetails = () => {
  return (
    <div>
        <div className='flex p-5 gap-2 items-center'>
            <Store size={32}/>
            <div className='flex flex-col'>
                <p className='font-bold text-lg'>Darshita Etel
                    
                </p>
                <Link href={"/"}>Visit Store</Link>
            </div>
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae est voluptas neque qui error eos laboriosam recusandae quo, aliquam, quod eius, iusto delectus minus non illum saepe architecto nihil quidem.</p>
    </div>
  )
}

export default SellerDetails