import fs from 'fs';
import path from 'path';

await fs.promises.mkdir('uploads', { recursive: true });
