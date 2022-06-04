export class ProductModel{

    public id: number;
    public name: string;
    public price: number;
    public imageUrl: string;
    public description: string;
    public isAvailable: boolean;

    constructor(id: number, name: string, price: number, imageUrl: string, description: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }


}