import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { desktopCors } from "@/lib/desktop-cors";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: desktopCors,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json(
        {
          error: "No files uploaded",
        },
        {
          status: 400,
          headers: desktopCors,
        },
      );
    }

    const urls: string[] = [];

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
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });

      urls.push(result.secure_url);
    }

    return NextResponse.json(
      {
        urls,
      },
      {
        headers: desktopCors,
      },
    );
  } catch (error: any) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      {
        message: error?.message,
        error: String(error),
        stack: error?.stack,
      },
      {
        status: 500,
        headers: desktopCors,
      },
    );
  }
}
