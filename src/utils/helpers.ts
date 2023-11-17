import { v4 as uuidv4 } from 'uuid';


export function generateFileName(): string {
  // Generate a unique file name using UUID
  return `${uuidv4()}.jpg`;
}
