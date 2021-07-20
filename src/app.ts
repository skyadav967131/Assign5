import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Application = express();

app.use(express.json());

//READ
app.get('/user/list', (req: Request, res: Response) => {
    const users = getUserData();
    //  console.log(users);
    res.send(users);
})

//CREATE
app.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData();

    //get the new user data from post request
    const userData = req.body
    //check if the userData fields are missing
    if (userData.name == null || userData.contact == null || userData.email == null || userData.roll == null || userData.role == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' })
    }

    //check if the username exist already
    const findExist = existUsers.find((user: any) => user.name === userData.name)
    if (findExist) {
        return res.status(409).send({ error: true, msg: 'username already exist' })
    }
    //append the user data
    existUsers.push(userData)
    //save the new user data
    saveUserData(existUsers);
    res.send({ success: true, msg: 'User data added successfully' })
})

//UPDATE

app.patch('/user/update/:username', (req, res) => {
    //get the username from url
    const username = req.params.username
    //get the update data
    const userData = req.body
    //get the existing user data
    const existUsers = getUserData()
    //check if the username exist or not       
    const findExist = existUsers.find((user: any) => user.name === username)
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'username not exist' })
    }
    //filter the userdata
    const updateUser = existUsers.filter((user: any) => user.name !== username)
    //push the updated data
    updateUser.push(userData)
    //finally save it
    saveUserData(updateUser)
    res.send({ success: true, msg: 'User data updated successfully' })
})


//DELETE
app.delete('/user/delete/:username', (req: Request, res: Response) => {
    const username = req.params.username
    //get the existing userdata
    const existUsers = getUserData()
    //filter the userdata to remove it
    const filterUser = existUsers.filter((user: any) => user.name !== username)
    if (existUsers.length === filterUser.length) {
        return res.status(409).send({ error: true, msg: 'username does not exist' })
    }
    //save the filtered data
    saveUserData(filterUser)
    res.send({ success: true, msg: 'User removed successfully' })

})

/*UTIL FUNCTION*/
//get the user data from json file
const getUserData = () => {
    const jsonData: any = fs.readFileSync('users.json')
    return JSON.parse(jsonData)
}

//read the user data from json file
const saveUserData = (data: any) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}


app.listen(5000, () => console.log('server running'));