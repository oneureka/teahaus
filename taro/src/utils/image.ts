export interface ImageOptions {
  width?: number
  height?: number
  fit?: 'crop' | 'clip' | 'max' | 'min'
  quality?: number
  format?: 'webp' | 'png' | 'jpg'
  params?: Record<string, string>
}

export function getImageUrl(url: string, options: ImageOptions = {}): string {
  try {
    const parsed = new URL(url)
    const sp = parsed.searchParams

    if (options.width) sp.set('w', String(options.width))
    if (options.height) sp.set('h', String(options.height))
    if (options.fit) sp.set('fit', options.fit)
    if (options.quality) sp.set('q', String(options.quality))
    if (options.format) sp.set('fm', options.format)

    if (options.params) {
      for (const [key, value] of Object.entries(options.params)) {
        sp.set(key, value)
      }
    }

    return parsed.toString()
  } catch {
    return url
  }
}
