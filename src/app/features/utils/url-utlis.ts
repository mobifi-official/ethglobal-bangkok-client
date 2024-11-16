
/**
 * Enum for predefined image sizes.
 */
export enum ImageSize {
    Crop100x100 = "100x100",
    Fit1024x768 = "1024x768",
    Crop120x120 = "120x120",
    Crop240x240 = "240x240",
    FitH220 = "x220",
    FitH500 = "x500"
  }
  
/**
 * Replaces the {size} placeholder in the given URL with the specified size.
 *
 * @param url - The URL containing the {size} placeholder.
 * @param size - The size to replace the placeholder with.
 * @returns The URL with the size placeholder replaced.
 */
export function replaceSizeInUrl(url: string, size: ImageSize): string {
  return url?.replace("{size}", size);
}
