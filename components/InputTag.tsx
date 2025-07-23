"use client"
 
import * as React from "react"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { Input } from "./ui/input"

const InputTagMultiSelect = ({tagList, selectedTags, setTags}:{tagList:string[], selectedTags:string[], setTags:(tags:string[]) => void}) => {
    const [inputValue, setInputValue] = useState("");
        
    const toggleTag = (tag: string) => {
      setTags(selectedTags.includes(tag)
        ? selectedTags.filter((t:string) => t !== tag)
        : [...selectedTags, tag]
      );
    };
   
    return (
      <Popover modal={true}>
          <Button
            variant="outline"
            role="combobox"
            // aria-expanded={isOpen}
            asChild
            size={'container'}
            className="max-w-full min-h-8 justify-between relative p-1 box-content"
          >
            <div>
              {selectedTags.length > 0
              ? <div className="flex flex-wrap gap-2">
                  {selectedTags.map((selectedTag) => (
                    <TagBadges badgeLabel={selectedTag} key={selectedTag} onCancel={toggleTag} />
                  ))}
                </div>
              : <span className="px-1">Select tags...</span>}
              <PopoverTrigger asChild>
                <Button variant={'link'} size={'container'} className="h-full absolute right-2 flex items-center justify-center cursor-pointer p-1">
                <ChevronsUpDown className="shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
            </div>
          </Button>
        <PopoverContent className="w-[200px] p-0" side="top" sideOffset={6} align="end" alignOffset={-9}>
          <Command>
            <CommandInput id="cmdinput" placeholder="Search tag..." value={inputValue} onValueChange={setInputValue}/>
            <CommandList>
              <CommandEmpty className="flex flex-col justify-center items-center px-5 py-2">
                <div>No tags found</div>
              </CommandEmpty>
              <CommandGroup>
                {tagList.map((tag) => (
                  <CommandItem
                    key={tag}
                    value={tag}
                    onSelect={(currentValue) => {
                      toggleTag(currentValue)
                      // setIsOpen(false)
                    }}
                  >
                    {tag}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
}

// export default InputTagMultiSelect


const TagBadges = ({badgeLabel, onCancel} : {badgeLabel: string, onCancel: (tag:string, setPopbox?:boolean) => void}) => {

    return (
        <Button asChild variant={'outline'} className="capitalize h-full">
          <div>
            {badgeLabel.length > 9 ? ( badgeLabel.slice(0,6) + '...' ): badgeLabel}
            <div className="cursor-pointer" onClick={() => {onCancel(badgeLabel, false)}}>
              <X/>
            </div>
          </div>
        </Button>
    )
}

const InputTagSimple = ({selectedTags, setTags}:{ selectedTags: string[]; setTags: (tags: string[]) => void }) => {
  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
      setTags([...selectedTags, tagInput.trim()]);
      setTagInput("");
  };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Remove last tag if input is empty and backspace is pressed
    if (e.key === "Backspace" && tagInput.trim() === "" && selectedTags.length > 0) {
      setTags(selectedTags.slice(0, -1));
    }

    if(e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };



  const removeTag = (tag: string) => {
    setTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="border p-2 rounded flex flex-wrap gap-2">
      {selectedTags.map((tag) => (
        <span key={tag} className="">
          {<TagBadges badgeLabel={tag} onCancel={removeTag} />}
        </span>
      ))}

      <Input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add Tag"
        className="border-none focus:ring-0 focus-visible:ring-[0px] bg-transparent dark:bg-transparent w-fit min-w-0 flex-grow basis-[100px]"
      />
    </div>
  );


 }
 
 export {InputTagSimple, InputTagMultiSelect}
 
