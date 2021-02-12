
class BeerModel {
    constructor(props = null) {
        this.alcoholPerc = props.alcoholPerc || null;
        this.imageUrl = props.imageUrl || null;
        this.name = props.name || null;
        this.pkBeer = props.pkBeer || null;
        this.pkBeerType = props.pkBeerType || null;
        this.pkCurrency = props.pkCurrency || null;
        this.pkManufacturer = props.pkManufacturer || null;
        this.price = props.price || null;
    }
}


export default BeerModel;
