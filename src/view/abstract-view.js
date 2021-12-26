export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instant AbstractClass, only concrete one');
    }
  }
}
