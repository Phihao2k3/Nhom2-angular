const Mailjet = require('node-mailjet');
const MJ_APIKEY_PUBLIC = '5062489f31a0b48cc197e7fb12a589cf';
const MJ_APIKEY_PRIVATE = '905f13c262d8921f391d418310b55c35';   

function sendForgotPasswordMail(users, host, resetLink) {
    const mailjet = Mailjet.apiConnect(
        MJ_APIKEY_PUBLIC,
        MJ_APIKEY_PRIVATE,
    );

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "nguyenduongthai000@gmail.com",
                        Name:   "Nguyễn Thái Dương"
                    },
                    To: [
                        {
                            Email: users[0].email,
                            Name:  users[0].first_name +' '+ users[0].last_name
                        }
                    ],
                    Subject: "Đổi mật khẩu",
                    HTMLPart: `Hãy click vào đây để đến trang đổi mật khẩu -> <a href='${resetLink}'>Đổi mật khẩu</a>
                               ${host}`
                }
            ]
        })
    return request;
}

module.exports = { sendForgotPasswordMail };