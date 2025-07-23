import React from 'react'
import { Button } from '../button'
import { Trash2 } from 'lucide-react'

const DeleteButton = ({deleteItem}:{deleteItem: ()=> void}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => deleteItem()}
      className="text-destructive hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

export default DeleteButton