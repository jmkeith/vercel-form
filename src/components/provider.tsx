"use client"

import { ChakraProvider } from "@chakra-ui/react"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { useServerInsertedHTML } from "next/navigation"
import { useState } from "react"
import { IconContext } from "react-icons"
import { system } from "@/components/sites/vercel-com-44cb5a40/shared/theme/system"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "@/components/ui/color-mode"

// Defaults for every react-icons icon rendered under the provider.
const iconDefaults: IconContext = {
  attr: { "aria-hidden": true, focusable: false },
  style: { flexShrink: 0 },
}

// Collects Emotion rules during SSR and flushes them into <head>, so no
// <style> tags end up inline in the markup (which breaks hydration).
function useEmotionCache() {
  const [registry] = useState(() => {
    const cache = createCache({ key: "vc" })
    cache.compat = true
    const insert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return insert(...args)
    }
    const flush = () => {
      const names = inserted
      inserted = []
      return names
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = registry.flush()
    if (names.length === 0) return null
    const styles = names.map((name) => registry.cache.inserted[name]).join("")
    return (
      <style
        key={names.join(" ")}
        data-emotion={`${registry.cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return registry.cache
}

export function Provider({ children, ...props }: ColorModeProviderProps) {
  const cache = useEmotionCache()

  return (
    <CacheProvider value={cache}>
      <ChakraProvider value={system}>
        <ColorModeProvider {...props}>
          <IconContext.Provider value={iconDefaults}>
            {children}
          </IconContext.Provider>
        </ColorModeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
