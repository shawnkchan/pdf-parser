import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const uniqueFileName = `${Date.now()}-${file.name}`;
  const filePath = join(process.cwd(), "public/uploads", uniqueFileName);

  const buffer = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(buffer));
  const url = `${req.headers.get("origin")}/uploads/${uniqueFileName}`;
  return NextResponse.json({ url: url });
}
