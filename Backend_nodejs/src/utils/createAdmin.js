const UserService = require('../services/user.service');

exports.createAdmin = () => {
    UserService.getUser({ userName: 'admin' })
        .then((admin) => {
            if (!admin) {
                const data = {
                    firstName: "Admin",
                    lastName: "Admin",
                    email: "admin@gmail.com",
                    userName: "admin",
                    password: "123456",
                    phoneNumber: "0987654321",
                    nationalId: "Vietnam",
                    dob: "2020-01-01"
                }
                UserService.create(data, 'admin');
            }
        })
}