class OperationResponse {

  constructor(data, error) {
    this.data = data;
    this.status = error ? true : false;
    this.errors = [];
    this.message = error;
  }


  /**
   * 
   * @param {*} data 
   * @param {*} error 
   */
  addResult(data, error = null) {
    this.data = data;
    this.status = error == null ? true : false;
    this.error = error;
  }


  /**
   * 
   * @param {*} error 
   */
  addError(error) {
    //console.log(error);
    this.errors.push(error);
    this.status = false;
  }
}

module.exports = OperationResponse;