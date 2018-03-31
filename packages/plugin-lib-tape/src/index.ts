import { StartPlugin, StartInput } from '@start/plugin-sequence'

export default (reporter: () => NodeJS.ReadWriteStream) => {
  const tape: StartPlugin = async ({ input }) => {
    const { default: test } = await import('tape')
    const { default: through } = await import('through')

    return new Promise<StartInput>((resolve, reject) => {
      const stream = test.createStream()
      // FIXME submit `tape.getHarness` to DefinitelyTypes
      // https://github.com/substack/tape/blob/9d501ff25b20f9318cda741c88cf50d469175da5/index.js#L47
      // @ts-ignore
      const results = test.getHarness()._results

      if (typeof reporter === 'function') {
        stream.pipe(reporter()).pipe(process.stdout)
      } else {
        stream.pipe(process.stdout)
      }

      results.once('done', function() {
        this._stream.queue(`\n1..${this.count}\n`)
        this._stream.queue(`# tests ${this.count}\n`)
        this._stream.queue(`# pass  ${this.pass}`)

        if (this.fail > 0) {
          this._stream.queue(`# fail  ${this.fail}\n`)
        } else {
          this._stream.queue('\n# ok\n')
        }

        this._stream.once('end', () => {
          if (this.fail > 0) {
            reject()
          } else {
            resolve(input)
          }

          this.count = 0
          this.fail = 0
          this.pass = 0
          this.tests = []
          this._stream = through()
        })
        this._stream.queue(null)
      })

      // TODO: get rid of `require`
      input.forEach((file) => require(file.path))
    })
  }

  return tape
}
