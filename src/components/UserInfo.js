export default class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._titleSelector = titleSelector;
    this._descriptionSelector = descriptionSelector;
  }

  getUserInfo() {
    const userInfo = {
      title: this._titleSelector.textContent,
      description: this._descriptionSelector.textContent,
    };

    return userInfo;
  }

  setUserInfo({ newTitle, newDescription }) {
    this._titleSelector.textContent = newTitle;
    this._descriptionSelector.textContent = newDescription;
  }
}
