module.exports = class ProductDTO {
    id_product
    name_type
    title_product
    path_image_product
    price_product
    count_product
    type_product
    constructor(id_product, name_type, title_product, path_image_product, price_product, type_product, count_product) {
        this.id_product = id_product
        this.name_type = name_type
        this.title_product = title_product
        this.path_image_product = path_image_product
        this.price_product = price_product
        this.count_product = count_product
        this.type_product = type_product
    }
}