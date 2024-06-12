class ItemListing {
    constructor(name, price, ownerAddress, id) {
      this._name = name;
      this._price = price;
      this._ownerAddress = ownerAddress;
      this._id = id;
    }
  
    get name() {
      return this._name;
    }
  
    set name(value) {
      this._name = value;
    }
  
    get price() {
      return this._price;
    }
  
    set price(value) {
      this._price = value;
    }
  
    get ownerAddress() {
      return this._ownerAddress;
    }
  
    set ownerAddress(value) {
      this._ownerAddress = value;
    }
  
    get id() {
      return this._id;
    }
  
    set id(value) {
      this._id = value;
    }
  }
  
  export default ItemListing;
  