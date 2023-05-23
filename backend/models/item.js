class Item {
    price = 0.0;
    description = "";
    title = "";
    seller; // type of User
    buyers = []; // arr of User
    expired = false;
    dateListed = "";
}

modules.export = Item;
