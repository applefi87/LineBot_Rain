import users from '../models/users.js'

const usersPush = async (id, arr) => {
  const result = await users.findOne({ id })
  if (!result) {
    await users.create({ id, places: [arr] })
    console.log('created');
  } else {
    const firstSame = JSON.stringify(result.places[1]) == JSON.stringify(arr)
    if (result.places.length > 1) {
      if (firstSame) {
        console.log('same');
      } else {
        console.log('not same');
        result.places.shift()
        result.places.push(arr)
      }
    }
    else if (!firstSame) {
      result.places.push(arr)
    }
    console.log('save');
    await result.save()
  }
}
const usersGet = async () => {
  return await users.find()
}

export { usersPush, usersGet }