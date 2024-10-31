"use client";

import { Switch } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "./icons/SunIcon";
import { MoonIcon } from "./icons/MoonIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDarkMode = (e) => {
    if (e){
        setTheme('light')
    } else {
        setTheme('dark')
    }
  }

  if(!mounted) return null

  return (
    <Switch
      isSelected={theme === 'light' ? true : false}
      size="lg"
      color="default"
      onChange={()=> handleDarkMode(event.target.checked)}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    >
      Dark mode
    </Switch>
  )
};