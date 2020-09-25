const getCharacter = require('../api/snapshot.example')
const rick = require('../rick.json')

describe('ItsTimeToSnapshots', () => {
  test('SnapshotOfRick', () => {
    expect(getCharacter(rick)).toMatchSnapshot()
  })
  test('EverWillFailSnapshot', () => {
    const user = {
      createAt: new Date(),
      id: Math.floor(Math.random() * 10)
    }
    expect(user).toMatchSnapshot()
  })
  test('WeHaveException', () => {
    const user = {
      id: Math.floor(Math.random() * 10),
      name: 'Rubén Esparza'
    }
    expect(user).toMatchSnapshot({
      id: expect.any(Number)
    })
  })
})
