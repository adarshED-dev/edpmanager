const bcrypt = require("bcrypt");

async function random_id_generator(project, salt){
    const hashedPassword = await bcrypt.hash(project, salt);
    const id = hashedPassword.slice(10, 20)
    return id;
}

module.exports = random_id_generator;