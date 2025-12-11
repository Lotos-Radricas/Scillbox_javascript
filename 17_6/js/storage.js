export const storage = {
  getItems() {
    const data = localStorage.getItem('warehouseItems');
    return data ? JSON.parse(data) : [];
  },
  saveItems(items) {
    localStorage.setItem('warehouseItems', JSON.stringify(items));
  },
  addItem(item) {
    const items = this.getItems();
    items.push(item);
    this.saveItems(items);
  },
  deleteItem(id) {
    let items = this.getItems();
    items = items.filter(item => item.id !== id);
    this.saveItems(items);
  },
  updateItem(updatedItem) {
    let items = this.getItems();
    items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    this.saveItems(items);
  }
};