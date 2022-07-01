import users from '../models/users.js'

const usersPush = async (id, arr) => {
  const result = await users.findOne({ id })
  if (!result) {
    await users.create({ id, places: [arr] })
    console.log('created');
  } else {
    const firstSame = JSON.stringify(result.places[0]) == JSON.stringify(arr)
    if (result.places.length > 1) {
      if (firstSame) {
        console.log('same');
      } else {
        console.log('not same');
        result.places.pop()
        result.places.unshift(arr)
      }
    }
    else if (!firstSame) {
      result.places.unshift(arr)
    }
    console.log('save');
    await result.save()
  }
}
const usersGet = async () => {
  return await users.find()
}

export { usersPush, usersGet }