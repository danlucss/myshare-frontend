import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'



export const client = sanityClient({
    projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: true,
    token: import.meta.env.VITE_APP_SANITY_PROJECT_TOKEN,
    ignoreBrowserTokenWarning: true
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source);