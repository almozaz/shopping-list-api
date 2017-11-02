const router = require('express').Router()
const { ShoppingList } = require('../models')

router.get('/shopping-lists', (req, res, next) => {
    ShoppingList.find()
    .sort({ createdAt: -1 })
    .then((shoppingList) => res.json(shoppingList))
    .catch((error) => next(error))
  })
  .get('/shopping-lists/:id', (req, res, next) => {
    const id = req.params.id
    ShoppingList.findById(id)
      .then((shoppingList) => {
        if (!shoppingList) { return next() }
        res.json(shoppingList)
      })
      .catch((error) => next(error))
  })
  .post('/shopping-lists', (req, res, next) => {
    let newShoppingList = req.body
    newShoppingList.authorId = req.account._id

    ShoppingList.create(newShoppingList)
      .then((ShoppingList) => res.json(ShoppingList))
      .catch((error) => next(error))
  })
  .put('/shopping-lists/:id', (req, res, next) => {
    const updatedShoppingList = req.body
    const id = req.params.id

    ShoppingList.findByIdAndUpdate(id, {$set: updatedShoppingList}, { new: true})
      .then((shoppingList) => {
        if (!shoppingList) { return next() }
        res.json(shoppingList)
      })
      .catch((error) => next(error))
  })
  .patch('/shopping-lists/:id', (req, res, next) => {
    const patchForShoppingList = req.body
    const id = req.params.id

    ShoppingList.findById(id)
      .then((shoppingList) => {
        if (!shoppingList) { return next() }

        const updatedShoppingList = { ...shoppingList, ...patchForShoppingList}

        ShoppingList.findByIdAndUpdate(id, {$set: updatedShoppingList}, { new: true})
          .then((shoppingList) => {
            if (!shoppingList) { return next() }
            res.json(shoppingList)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })
  .delete('/shopping-lists/:id', (req, res, next) => {
    const id = req.params.id

    ShoppingList.findByIdAndRemove(id)
      .then(() => {
        res.status = 200
        res.json({
          message: 'Removed',
          _id: id
        })
      })
      .catch((error) => next(error))
  })


module.exports = router
