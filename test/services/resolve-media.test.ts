import app from '../../server/app'

describe('\'resolve-media\' service', () => {
  it('registered the service', () => {
    const service = app.service('resolve-media')

    expect(service).toBeTruthy()
  })
})