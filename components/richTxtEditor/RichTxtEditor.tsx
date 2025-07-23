'use client'

import React from 'react'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/react'
import MenuBar from './MenuBar'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { cn } from '@/lib/utils'

const RichTxtEditor = ({onChange, content, isEditable, className} : {onChange?: (content:string) => void, content:string, isEditable?: boolean; className?:string}) => {

    const editor = useEditor({
        editable: isEditable ?? true,
        extensions: [
          StarterKit.configure({
            bulletList: {
              HTMLAttributes: {
                class : 'list-disc ml-3'
              }
            },
            orderedList: {
              HTMLAttributes: {
                class : 'list-decimal ml-3'
              }
            }
          }),

          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),

          Highlight.configure({
            HTMLAttributes: {
              class: '',
            },
          })
        ],
        content: content,
        editorProps : {
            attributes : {
                class : cn('py-1 px-2 min-h-[120px] outline-none rounded-md text-sm border-input border-1 transition-[color,box-shadow] shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ',className)
            }
        },
        immediatelyRender: false,
        onUpdate: ({editor}) => {
          if (onChange) onChange(editor.getHTML());
          
        },
      })

  return (
    <>
        {isEditable ?? <MenuBar editor={editor}/>}
        <EditorContent 
        editor={editor}
         />
    </>
  )
}

export default RichTxtEditor