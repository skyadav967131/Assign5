//role
enum Role {
    superadmin,
    admin,
    subscriber,
};

//interface
interface UI {
    roll: number;
    name: string;
    email: string;
    contact: number;
    role: Role;
    modify: any;
    edit_row(number);
    save_row(number);
    delete_row(number);
    cancel_row(number);
};
//class
class user implements UI {
    roll: number;
    name: string;
    email: string;
    contact: number;
    role: Role;
    modify: any;
    constructor(roll, name, email, contact, role, modify) {
        this.roll = roll;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.role = role;
        this.modify = modify;
    }
    static delete_row(num) {
        let index = document.getElementById('row' + num).outerHTML = "";
    };
    static edit_row(no) {
        document.getElementById("edit_button" + no).style.display = "none";
        document.getElementById("save_button" + no).style.display = "block";

        let rno = document.getElementById("roll_row" + no);
        let name = document.getElementById("name_row" + no);
        let mail = document.getElementById("email_row" + no);
        let mob = document.getElementById("contact_row" + no);


        let roll_data = rno.innerHTML;
        let name_data = name.innerHTML;
        let mail_data = mail.innerHTML;
        let mob_data = mob.innerHTML;

        rno.innerHTML =
            "<input type='text' id='Roll_text" +
            no +
            "' value='" +
            roll_data +
            "' name='" +
            roll_data +
            "'>";
        name.innerHTML =
            "<input type='text' id='FirstName_text" +
            no +
            "' value='" +
            name_data +
            "' name='" +
            name_data +
            "'>";
        mail.innerHTML =
            "<input type='text' id='Email_text" +
            no +
            "' value='" +
            mail_data +
            "' name='" +
            mail_data +
            "'>";
        mob.innerHTML =
            "<input type='text' id='Phone_text" +
            no +
            "' value='" +
            mob_data +
            "' name='" +
            mob_data +
            "'>";
    };
    static save_row(no) {
        let rno_val = document.getElementById("Roll_text" + no).value;
        let fname_val = document.getElementById("FirstName_text" + no).value;
        let mail_val = document.getElementById("Email_text" + no).value;
        let mob_val = document.getElementById("Phone_text" + no).value;

        document.getElementById("roll_row" + no).innerHTML = rno_val;
        document.getElementById("name_row" + no).innerHTML = fname_val;
        document.getElementById("email_row" + no).innerHTML = mail_val;
        document.getElementById("contact_row" + no).innerHTML = mob_val;

        document.getElementById("edit_button" + no).style.display = "inline";
        document.getElementById("save_button" + no).style.display = "inline";
    };
    static cancel_row(no) {
        let rno_val = document.getElementById("Roll_text" + no).name;
        let fname_val = document.getElementById("FirstName_text" + no).name;
        let mail_val = document.getElementById("Email_text" + no).name;
        let mob_val = document.getElementById("Phone_text" + no).name;


        document.getElementById("roll_row" + no).innerHTML = rno_val;
        document.getElementById("name_row" + no).innerHTML = fname_val;
        document.getElementById("email_row" + no).innerHTML = mail_val;
        document.getElementById("contact_row" + no).innerHTML = mob_val;


        document.getElementById("cancel_button" + no).style.display = "inline";
        document.getElementById("edit_button" + no).style.display = "inline";
        document.getElementById("save_button" + no).style.display = "inline";
    };
}

let objects: Array<user> = [];
const tablefromjson = () => {
    // document.getElementById("refresh-data").setAttribute("value", "Refresh-data");
    
    const url = "http://localhost:5000/user/list";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach((obj: user) => {
                objects.push(obj);
            });
        })
    console.log(objects);
    

    //creating table;
    let table = document.createElement("table");
    let tr = table.insertRow(-1);
    let tablehead: string[] = ['roll', 'name', 'email', 'contact', 'role', 'modify'];
    for (let i = 0; i < tablehead.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = tablehead[i];
        tr.appendChild(th);
    }
    objects.forEach((object) => {
        let row = table.insertRow(-1);
        row.id = "row" + object.roll;
        Object.keys(object).forEach(index => {
            let cell = row.insertCell(-1);
            if (index == 'modify')
                cell.innerHTML = `<input type='button' id = 'edit_button${object.roll}' value='edit' onclick='user.edit_row(${object.roll})'> <input type='button' id='save_button${object.roll}' value='save' onclick='user.save_row(${object.roll})'> <input type='button' id='cancel_button${object.roll}' value='cancel' onclick='user.cancel_row(${object.roll})'> <input type='button' value='Delete' class='delete ' onclick='user.delete_row(${object.roll})'>`;
            else {
                cell.id = index + "_row" + object['roll'];
                cell.innerHTML = object[index];
            }
        });
    });
    console.log(table);


    //final table 
    let finaltable = document.getElementById('show-data');
    finaltable.parentElement.replaceChild(table, finaltable);
    console.log(finaltable);
};