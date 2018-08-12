const express = require('express');
const store = require('../data/region');

const router = express.Router();

module.exports = router;

router
  .get('/', async (request, response, next) => {
    const regions = await store.getAll().catch(next);
    regions.forEach(region => {
      region.paths = JSON.parse(region.paths);
    });
    response.json(regions);
  })
  .get('/:id', async({ params }, response) => {
    const region = await store.getById(params.id);
    if(!region){
      response.sendStatus(404);
    } else {
      region.paths = JSON.parse(region.paths);
      response.json(region);
    }
  })
  .put('/:id', async ({ params, body }, response, next) => {
    const id = await store.update(params.id, JSON.stringify(body.paths)).catch(next);
    if(id){
      response.sendStatus(200);
    }
  })
  .post('/', async ({ body }, response, next) => {
    const id = await store.create(body.name, JSON.stringify(body.paths)).catch(next);
    if(id){
      response.json({ id });
    }
  })
  .delete('/:id', async ({params}, response, next) => {
    const result = await store.delete(params.id).catch(next);
    if(result){
      response.sendStatus(200);
    }
  });