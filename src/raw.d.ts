// Vite's `?raw` suffix imports a file's contents as a string. Used by
// taxonomy.test.ts to assert a component reads its copy from COPY rather than
// hardcoding it. Declared here because this project does not pull in
// `vite/client` types.
declare module '*?raw' {
  const content: string
  export default content
}
