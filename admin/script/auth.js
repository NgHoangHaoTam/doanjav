function login() {
    const email = document.getElementById('exampleInputEmail').value;
    const password = document.getElementById('exampleInputPassword').value;

    if (email === "haotam@gmail.com" && password === "1") {
        localStorage.setItem('loggedIn', 'true'); 
        localStorage.setItem('userName', email); 
        window.location.href = "index.html"; 
        return false; 
    } else {
        alert("Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.");
        return false; 
    }
}
function checkLogin() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = "login.html"; 
    } else {
        const userName = localStorage.getItem('userName'); 
        document.getElementById('userNameDisplay').innerText = userName; 
    }
}
function logout() {
    localStorage.removeItem('loggedIn'); 
    localStorage.removeItem('userName'); 
    window.location.href = "login.html"; 
}
