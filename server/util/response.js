class ResponseClass {
    
    constructor(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }

    getResponse(){
        return { 
                success: this.status,
                message: this.message,
                data: this.data
            }
        }
    
}