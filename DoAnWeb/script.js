const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Lấy users từ LocalStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Lưu users vào LocalStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function showForgotForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('forgotForm').style.display = 'block';
    document.getElementById('pageTitle').innerText = 'Quên mật khẩu';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('forgotForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('pageTitle').innerText = 'Đăng nhập';

    document.getElementById('forgotForm').reset();
    document.getElementById('registerForm').reset();
    document.getElementById('passBox').style.display = 'none';
    document.getElementById('forgotBtn').innerText = 'Kiểm tra';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('pageTitle').innerText = 'Đăng ký';
}

// Khởi tạo CSDL mẫu nếu chưa có
if (!localStorage.getItem('users')) {
    let initialUsers = [
        { email: 'quan02077@gmail.com', username: 'Minh Quan', password: '123456', role: 'Nhân viên'},
        { email: 'A123@gmail.com', username: 'Nguyen Van A', password: '123456', role: 'Khách hàng'},
    ];
    saveUsers(initialUsers);
}

// Đăng nhập
function login() {
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value;
    let role = document.getElementById('roleSelection').value;
    let users = getUsers();
    
    if(!emailValidation.test(username) && !users.some(u => u.username === username)) {
        alert('Vui lòng nhập đúng định dạng email hoặc username.');
        return;
    }

    let user = users.find(u => 
        (u.username === username || u.email === username) && 
        u.password === password && 
        u.role === role
    );

    if (user) {
        alert('Đăng nhập thành công!');
        window.location.href = "homePage.html";
    } else {
        alert('Tên đăng nhập, mật khẩu hoặc quyền không đúng.');
        document.getElementById('password').value = ''; // Chỉ xóa pass, giữ username để user đỡ nhập lại
    }
}

// Quên mật khẩu
function forgotPassword() {
    let username = document.getElementById('forgotUsername').value.trim();
    let forgotBtn = document.getElementById('forgotBtn');
    let newPass = document.getElementById('newPassword').value;
    let confirmPass = document.getElementById('confirmPassword').value;
    let passBox = document.getElementById('passBox');
    
    let users = getUsers();
    let index = users.findIndex(u => u.username === username || u.email === username);

    if (index === -1) {
        alert('Tài khoản không tồn tại. Vui lòng kiểm tra lại.');
        return; 
    }

    if (passBox.style.display !== 'block') {
        alert('Tài khoản hợp lệ. Vui lòng nhập mật khẩu mới.');
        passBox.style.display = 'block';
        forgotBtn.innerText = 'Xác nhận thay đổi';
        return;
    }

    if (!newPass || !confirmPass) {
        alert('Vui lòng nhập đầy đủ mật khẩu mới.');
        return;
    }

    if (newPass === confirmPass) {
        users[index].password = newPass; 
        saveUsers(users); 
        alert('Mật khẩu đã được cập nhật thành công!');
        showLoginForm(); 
    } else {
        alert('Mật khẩu xác nhận không khớp. Vui lòng thử lại.');
    }
}

// Đăng ký
function register(){
    let email = document.getElementById('registerEmail').value.trim();
    let username = document.getElementById('registerUsername').value.trim();
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('registerConfirmPassword').value;
    let role = document.getElementById('registerRoleSelection').value;

    let users = getUsers();

    if (!emailValidation.test(email)) {
        alert('Vui lòng nhập đúng định dạng email.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp.');
        return;
    }

    if (users.some(u => u.username === username || u.email === email)) {
        alert('Email hoặc username đã tồn tại.');
        return;
    }

    users.push({ email, username, password, role });
    saveUsers(users);

    alert('Đăng ký thành công!');
    showLoginForm();
}

// Nhấn Enter
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Ngăn form tự reload trang
        event.preventDefault(); 
        
        if (document.getElementById('loginForm').style.display !== 'none') {
            document.getElementById('loginBtn').click();
        } else if (document.getElementById('registerForm').style.display !== 'none') {
            document.getElementById('registerBtn').click();
        } else if (document.getElementById('forgotForm').style.display !== 'none') {
            document.getElementById('forgotBtn').click();
        }
    }
});

// Clear form
window.onload = function() {
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
    document.getElementById('forgotForm').reset();
};

// Xử lý banner slider 
const slides = document.querySelector('.slides');

if (slides) {
    let index = 0;
    const totalSlides = document.querySelectorAll('.slides img').length;

    function showSlide(i) {
        slides.style.transform = `translateX(-${i * 100}%)`;
    }

    function autoSlide() {
        if (index < totalSlides - 1) {
            index++;
        } else {
            index = 0; 
        }
        showSlide(index);
    }

    setInterval(autoSlide, 4000);
}