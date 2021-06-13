const Database = require("./config");

const iniDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    userName TEXT UNIQUE, 
    password TEXT,
    totalBalance INT,
    classroom INT
)`);

    await db.exec(`CREATE TABLE transactions(
    id_Transaction INTEGER PRIMARY KEY AUTOINCREMENT,
    nameAluno TEXT,
    usernameAluno TEXT,
    classroomAluno INT,
    nameItem TEXT,
    imageItem TEXT,
    price INT,
    date DATATIME,
    quantity INT,
    status INT,
    id_Aluno INTEGER,
    CONSTRAINT fk_PesTransac FOREIGN KEY (id_Aluno) REFERENCES profile (id)
)`);

    await db.exec(`CREATE TABLE product(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nameProduct TEXT,
    imageProduct TEXT,
    priceProduct INT
)`);

/* await db.run(`INSERT INTO product(
    nameProduct,
    imageProduct,
    priceProduct
        )VALUES (
            "Bala Lua Cheia",
            "",
            10
        );`); */

    /*  await db.run(`INSERT INTO profile(
    name, 
    avatar, 
    userName, 
    password, 
    totalBalance
    )VALUES (
        "Guilherme de Camargo Barbosa",
        "https://i.ibb.co/RzkcKVG/IMG-20190411-083602.jpg",
        "@gui_123",
        "123",
        1000
    );`);

    await db.run(`INSERT INTO transactions(
    nameItem,
    imageItem,
    price,
    date
        )VALUES (
            "Bis",
            "https://drive.google.com/file/d/1ruO6Y7wGVo6ykRYQvoeeKt6tmZlkkIiI/view?usp=sharing",
            150,
            1617514376018
        );`); */

    await db.close();
  },
};

iniDb.init();
