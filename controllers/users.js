import users from '../models/users.js'

const usersPush = async (id, arr) => {
  const result = await users.findOne({ id })
  if (!result) {
    await users.create({ id, places: arr })
  } else {
    result.places = arr
    await result.save()
  }
  console.log(result);
  //   if(result.places.length>3){
  // console.log('Too Much Item');
  //   }
  // result.places = arr
  // await result.save()
  // const idx = users.
}
const usersGet = async () => {
  return await users.find()
}

export  { usersPush, usersGet }