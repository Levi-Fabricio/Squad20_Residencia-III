const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim())
}

export function isValidCpf(value: string) {
  const digits = digitsOnly(value)
  if (digits.length !== 11) {
    return false
  }
  if (/^(\d)\1{10}$/.test(digits)) {
    return false
  }

  const calc = (length: number) => {
    const slice = digits.slice(0, length)
    let sum = 0
    for (let index = 0; index < length; index += 1) {
      sum += Number(slice[index]) * (length + 1 - index)
    }
    const rest = (sum * 10) % 11
    return rest === 10 ? 0 : rest
  }

  return calc(9) === Number(digits[9]) && calc(10) === Number(digits[10])
}

export function isValidIdentifier(value: string) {
  const trimmed = value.trim()
  return isValidEmail(trimmed) || isValidCpf(trimmed)
}

export function formatCpf(value: string) {
  const digits = digitsOnly(value).slice(0, 11)
  if (digits.length <= 3) {
    return digits
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`
  }
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}
