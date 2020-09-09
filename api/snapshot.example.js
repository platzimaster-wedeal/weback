const getCharacter = data => ({
  id: data.id,
  name: data.name,
  gender: data.gender,
  species: data.species,
  status: data.status
})

module.exports = getCharacter
