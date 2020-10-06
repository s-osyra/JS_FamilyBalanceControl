const token = sessionStorage.getItem('token');
const formLogin = document.getElementById('form-login');
const buttonAddFamily = document.getElementById('button-add-family');
const buttonAddMember = document.getElementById('button-add-member');
const buttonAddCurrency = document.getElementById('button-add-currency');
const buttonLogut = document.getElementById('button-logout');
const formAddFamily = document.getElementById('form-add-family');
const formAddMember = document.getElementById('form-add-member');
const formAddCurrency = document.getElementById('form-add-currency');
const loginView = document.getElementById('login-view');
const mainView = document.getElementById('main-view');
const infoMsg = document.getElementById('info-msg');

buttonAddFamily.addEventListener('click', () => {
    formAddFamily.style.visibility = 'visible';
    formAddMember.style.visibility = 'hidden';
    formAddCurrency.style.visibility = 'hidden';
    msgReset();

});

buttonAddMember.addEventListener('click', () => {
    formAddFamily.style.visibility = 'hidden';
    formAddMember.style.visibility = 'visible';
    formAddCurrency.style.visibility = 'hidden';
    msgReset();
});

buttonAddCurrency.addEventListener('click', () => {
    formAddFamily.style.visibility = 'hidden';
    formAddMember.style.visibility = 'hidden';
    formAddCurrency.style.visibility = 'visible';
    msgReset();
});

buttonLogut.addEventListener ('click', () => {
    sessionStorage.removeItem('token');
    window.location.reload();
});

const msgStyle = (color, value) => {
     
        infoMsg.style.padding = '1vw';
        infoMsg.style.backgroundColor= 'white';
        infoMsg.style.color = color;
        infoMsg.innerText = value;
    };

    const msgReset = () => {
     
        infoMsg.style.padding = '1vw';
        infoMsg.style.backgroundColor= 'transparent';
        infoMsg.style.color = 'transparent';
        infoMsg.innerText = '';
    };

window.addEventListener('load', () => {
        if (!token) {
            loginView.style.visibility = 'visable';
            mainView.style.visibility = 'hidden';
        } else {
            loginView.style.visibility = 'hidden';
            mainView.style.visibility = 'visible'; 
            formAddFamily.style.visibility = 'visible';   
        };
  });


const fetchLogin = async (email, password) => {
    const url = 'http://localhost:80/users/login';

    const bodyInput = {
        email: email,
        password: password
    }

    const loginParam={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyInput)   
    };

    
        const res = await fetch(url, loginParam);
        if (res.status !== 200) {
            return  404;
        };
       
        const data = await res.json();

        return data;
    };

    const fetchAddFamily = async (familyName) => {
        const url = 'http://localhost:80/admin/family/create';
        
     
         bodyInput = {
             familyName: familyName
         }

         const loginParam={
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': token,
             },
             body: JSON.stringify(bodyInput)   
         };
     
         
             const res = await fetch(url, loginParam);
             if (res.status !== 200) {
                 return  500;
             };

             const data = await res.json();

             return data;

     };

     const fetchAddMember = async (userEmail,familyName) => {
        const url = 'http://localhost:80/admin/family/addmember';
        
     
         bodyInput = {
             familyName: familyName,
             email: userEmail
         };
         const loginParam={
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': token,
             },
             body: JSON.stringify(bodyInput)   
         };
     
         
             const res = await fetch(url, loginParam);
             if (res.status !== 200) {
                 return  500;
             };

             const data = await res.json();

             return data;

     };

     const fetchAddCurrency = async (familyName, amount) => {
        const url = 'http://localhost:80/admin/family/add';

         bodyInput = {
             familyName: familyName,
             amount: amount
         };
         const loginParam={
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': token,
             },
             body: JSON.stringify(bodyInput)   
         };
     
         
             const res = await fetch(url, loginParam);
             if (res.status !== 200) {
                 return  500;
             };

             const data = await res.json();

             return data;

     };



formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()  
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

   
    const login = await fetchLogin(email,password);
    
    if (login === 404) {
        msgStyle('red','WRONG CREDENTIALS');
        return
    }

    const berer = 'Bearer ' + login.token;
    sessionStorage.setItem('token', berer);
    window.location.reload();


});

formAddFamily.addEventListener('submit', async (e) => {
    e.preventDefault();

    const familyName = e.target.elements.newFamilyName.value;

    const family = await fetchAddFamily(familyName);
    
    if (family === 500) {
        msgStyle('red','ERROR!');
        return
    };

    msgStyle('green','SUCCESS!');

});

formAddMember.addEventListener('submit', async (e) => {
    e.preventDefault();

    const familyName = e.target.elements.memberFamilyName.value;
    const email = e.target.elements.newMemberEmail.value;
    const member = await fetchAddMember(email, familyName);
    
    if (member === 500) {
        msgStyle('red','ERROR!');
        return
    };

    msgStyle('green','SUCCESS!');

});

formAddCurrency.addEventListener('submit', async (e) => {
    e.preventDefault();

    const familyName = e.target.elements.addFamilyCurrency.value;
    const amount = e.target.elements.amount.value;
    const currency = await fetchAddCurrency(familyName, amount);
    
    if (currency === 500) {
        msgStyle('red','ERROR!');
        return
    };

    msgStyle('green','SUCCESS!');

});