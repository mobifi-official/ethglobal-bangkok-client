import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Parse query parameters
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("fileName");

  if (!fileName) {
    return NextResponse.json(
      { error: "Missing fileName parameter" },
      { status: 400 }
    );
  }

  // Prevent directory traversal attacks
  const safeFileName = path.basename(fileName);
  const sourcePath = path.join(
    process.cwd(),
    "src/app/lib/chainlink/sources",
    safeFileName
  );

  try {
    const source = fs.readFileSync(sourcePath, "utf8");
    return NextResponse.json({ source });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
