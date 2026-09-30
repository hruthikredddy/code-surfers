import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.resolve(process.cwd(), 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export interface StoredFileInfo {
  filename: string;
  originalName: string;
  storagePath: string;
  fileSize: number;
  mimeType: string;
  sha256Hash: string;
}

export class StorageService {
  /**
   * Save uploaded buffer or file to local disk storage with SHA256 checksum
   */
  static async saveFile(
    originalName: string,
    buffer: Buffer,
    mimeType: string
  ): Promise<StoredFileInfo> {
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    const safeExt = path.extname(originalName).toLowerCase() || '.bin';
    const uniqueFilename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${safeExt}`;
    const storagePath = path.join(UPLOAD_DIR, uniqueFilename);

    await fs.promises.writeFile(storagePath, buffer);

    return {
      filename: uniqueFilename,
      originalName: path.basename(originalName),
      storagePath,
      fileSize: buffer.length,
      mimeType,
      sha256Hash: hash
    };
  }

  /**
   * Read file buffer safely preventing path traversal
   */
  static async readFile(storagePath: string): Promise<Buffer> {
    const resolved = path.resolve(storagePath);
    if (!resolved.startsWith(UPLOAD_DIR)) {
      throw new Error('Access denied: Invalid storage path traversal attempt');
    }
    return await fs.promises.readFile(resolved);
  }

  /**
   * Delete stored file safely
   */
  static async deleteFile(storagePath: string): Promise<void> {
    try {
      const resolved = path.resolve(storagePath);
      if (resolved.startsWith(UPLOAD_DIR) && fs.existsSync(resolved)) {
        await fs.promises.unlink(resolved);
      }
    } catch (err) {
      console.warn('Failed to delete stored file:', err);
    }
  }
}
