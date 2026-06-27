"use server";

import cloudinary from "@/lib/cloudinary";

export async function uploadProductImages(formData: FormData) {
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    throw new Error("No files uploaded");
  }

  if (files.length > 5) {
    throw new Error("Maximum 5 images allowed");
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "products",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    uploadedUrls.push(result.secure_url);
  }

  return uploadedUrls;
}
