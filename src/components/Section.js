export default class Section {
  constructor({ item, renderer }, classSelector) {
    this._items = item;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }
  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }
  addItem(element) {
    this._classSelector.prepend(element);
  }
}
