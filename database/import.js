const prisma = require('./client')

async function run() {
    var admin = await prisma.admin.findFirst({
        where: {
            username: "admin"
        }
    })
    console.log(`admin`, admin)
    if (!admin) {
        prisma.admin.create({
            data: {
                username: "admin",
                password: "admin"
            }
        }).then((result) => console.log(`result`, result))
    }
}

run()