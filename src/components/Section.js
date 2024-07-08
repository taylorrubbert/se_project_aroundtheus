export default class Section {
  constructor({ items, renderer }) {
    this._items = items;
    this._renderer = renderer;
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._container.append(element);
  }
}
