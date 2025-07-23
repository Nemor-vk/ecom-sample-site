import React, { useState } from 'react'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes';

const ThemeToggleBtn = () => {

    const [isDarkMode, setisDarkMode] = useState(true);
    const { setTheme } = useTheme()

    const changeTheme = () => {

      setisDarkMode(!isDarkMode);
      const theme = isDarkMode ? setTheme("dark") : setTheme("light");
    }

  return (
    <Button onClick={() => {changeTheme()}} className={`bg-background text-foreground cursor-pointer ${!isDarkMode? 'hover:bg-[#121c30]' : 'hover:bg-gray-200'}`}>
       { isDarkMode ? <Sun/> : <Moon/>}
    </Button>
  )
}

export default ThemeToggleBtn