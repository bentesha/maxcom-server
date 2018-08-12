const express = require('express');
const store = require('../data/user');
const regionStore = require('../data/region');

const router = express.Router();

router.get('/', async(request, response, next) => {
  const users = await store.getAll().catch(next);
  if(users){
    response.json(users);
  }
})
.get('/:id', async ({ params }, response, next) => {
  const user = await store.getById(params.id).catch(next);
  if(user){
    response.json(user);
  } else if(user === null){
    response.sendStatus(404);
  }
})
.post('/', async ({ body }, response, next) => {
  const { name, password, region, phone } = body;
  const user = await store.create(name, phone, password, region).catch(next);
  if(user){
    response.json(user);
  }
})
.delete('/:id', async ({params}, response, next) => {
  const result = await store.delete(params.id).catch(next);
  if(result){
    response.sendStatus(200);
  }
})
.post('/login', async({ body }, response, next) => {
  const phone = body.phone || '';
  const password = body.password || '';

  if(typeof phone !== 'string' || phone.trim() === ''){
    return response.status(400).json({
      error: 'Phone number is not a valid value or was not specified'
    });
  }

  if(typeof password !== 'string' || password.trim() === ''){
    return response.status(400).json({
      error: 'Password is not a valid value or was not specified'
    });
  }

  let user = await store.getByPhone(phone).catch(next);
  if(user === undefined){
    //An error was thrown and was handled by catch call above
    return;
  } else if(user){
    user = user.password === password ? user : null;
  }
  if(user === null){
    //Invalid user name or phone number
    response.status(404).json({
      error: 'Invalid phone number or password'
    });
  } else {
    const region = await regionStore.getById(user.region).catch(next);
    if(region === undefined){
      return; //There was an error
    }
    region.paths = JSON.parse(region.paths);
    response.json({
      name: user.name,
      region,
      phone: user.phone
    });
  }
});

module.exports = router;