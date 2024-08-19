import { createUploadthing } from "uploadthing/server";
const f = createUploadthing()


export const ourFileRouter = {
 
   imageUploader: f({ image: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ metadata, file }) => {
         return (file.url)


      }),
   imageUploader2: f({ image: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ metadata, file }) => {
         return (file.url)


      }),
      imageUploader3: f({ image: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ metadata, file }) => {
         return (file.url)


      }),
   
      imageUploader4: f({ image: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ metadata, file }) => {
         return (file.url)


      }),
      imageUploader5: f({ image: { maxFileSize: "4MB" } })
      .onUploadComplete(async ({ metadata, file }) => {
         return (file.url)


      }),
   
   


}