const { response } = require('express');
const express=require('express');
const { request } = require('http');
const port=8000;
const path=require('path');
const db=require('./config/mongoose');
const Contact = require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
var contactList=[];

app.get('/',(request,response)=>{
    Contact.find({},(err,contacts)=>{
        if(err){
            console.log("Error in creating contract!",err);
        }
        return response.render('home',{ 
            contact_list:contacts
        });
    });
});
app.get('/delete-contact/',(request,response)=>{
    let id=request.query.id;
    Contact.findByIdAndDelete(id,err=>{
        if(err){
            console.log("error occured while deleting!",err);
        }
        return response.redirect('back');
    });
});
app.post('/',(request,response)=>{
    Contact.create({
        name: request.body.name,
        phone: request.body.phone
    },(err,newContact)=>{
        if(err){
            console.log("Error in creating contact",err);
            return;
        }
        console.log("**************",newContact);
        return response.redirect('back');
    });    
});
app.listen(port,(err)=>{
    if(err){
    console.log('OOPS! Error Occured!',err)
    }
    return console.log("Server Up and Running! on port",port);
});