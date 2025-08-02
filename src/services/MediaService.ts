import { MultipartFile } from "@fastify/multipart";
import path from "path";
import fs from "fs/promises";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 2 * 1024 * 1024;
export class MediaService {
  static async saveFile(file: MultipartFile, prefix: string): Promise<string> {
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Invalid file type");
    }

    if (file.file.truncated) {
      throw new Error("File too large");
    }

    const buffer = await file.toBuffer();
    const filename = `${prefix}-${Date.now()}-${file.filename}`;
    const uploadPath = path.join(__dirname, "..", "..", "uploads", filename);

    await fs.writeFile(uploadPath, buffer);

    return `/uploads/${filename}`;
  }

  static async saveMultipleFiles(files: MultipartFile[], prefix: string): Promise<string[]> {
    const urls: string[] = [];
    for (const file of files) {
      const url = await this.saveFile(file, prefix);
      urls.push(url);
    }
    return urls;
  }

    static async deleteFiles(urls: string[]) {
    for (const url of urls) {
      const filePath = path.join(__dirname, "..", "..", url);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
          console.error("Error deleting file:", filePath, err);
          throw new Error("Error deleting one or more files");
        }
      }
    }
    return true;
  }
}
