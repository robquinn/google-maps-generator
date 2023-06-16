const isProd = (): boolean => (process.env.NODE_ENV as string) === 'production'

export default isProd
