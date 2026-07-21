export interface ImageOptions {
  width?: number
  height?: number
}

export function getImageUrl(url: string, options: ImageOptions = {}): string {
  try {
    const parsed = new URL(url)
    const sp = parsed.searchParams

    if (options.width) sp.set('w', String(options.width))
    if (options.height) sp.set('h', String(options.height))

    return parsed.toString()
  } catch {
    return url
  }
}
