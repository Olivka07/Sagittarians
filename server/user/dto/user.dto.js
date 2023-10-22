module.exports = class UserDto {
    name
    surname
    login
    password
    email
    id_user
    linkactivated
    user_role
    constructor(model) {
        this.email = model.email
        this.name = model.name
        this.surname = model.surname
        this.login = model.login
        this.password = model.password
        this.id_user = model.id_user
        this.linkactivated = model.linkactivated
        this.user_role = model.user_role
    }
}