import { LocalDB } from 'https://cdn.skypack.dev/peadb'
import shortid from 'https://cdn.skypack.dev/shortid'

const db = new LocalDB('grocery-list-db')
const groceries = db.getAll() || []

const groceryList = document.getElementById('groceryList')
const newGroceryInput = document.getElementById('newGrocery')
const addBtn = document.getElementById('addBtn')
const anotherBtn = document.getElementById('anotherBtn')


const createGroceryElement = grocery => {
  const groceryElement = document.createElement('li')
  groceryElement.innerText = grocery.value
  groceryElement.classList.add('groceryItem')
  groceryElement.addEventListener('click', () => {
    groceryElement.remove()
    db.delete(grocery.key)
  })
  return groceryElement
}

const addGrocery = newGrocery => {
  groceryList.appendChild(createGroceryElement(newGrocery))
}

addBtn.addEventListener('click', e => {
  e.preventDefault()
  const value = newGroceryInput.value
  if (value) {
    const key = shortid.generate()
    addGrocery({ key, value })
    db.set(key, value)
    newGroceryInput.value = null
  }
})

groceries.map(grocery => addGrocery(grocery))

searchBtn.addEventListener('click', e => {
    e.preventDefault()
    const value = newGroceryInput.value
    if (value) {
      const key = shortid.generate()
      addGrocery({ key, value })
      db.set(key, value)
      window.open('http://walmart.com/search?q=' + newGroceryInput.value);
      newGroceryInput.value = null
    }
  })