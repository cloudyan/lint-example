export const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t, 'done'))

export const config = {
  env: 'dev',
}
