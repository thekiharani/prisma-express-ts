import bcrypt from 'bcryptjs'

export const hashPassword = async (text: string): Promise<string> => {
  const hashed = await bcrypt.hash(text, 10)
  return hashed
}

export const assertPassword = async (
  text: string,
  hashed: string
): Promise<boolean> => {
  const matched = await bcrypt.compare(text, hashed)
  return matched
}
