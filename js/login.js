$(document).ready(function() {

    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        $('#login-global-error').addClass('hidden'); 

        const email = $('#login-email').val();
        const password = $('#login-password').val();

        // SIMULASI: Kredensial yang valid
        const validEmail = 'test@mail.com';
        const validPassword = 'Untar123';

        // Validasi kredensial
        if (email === validEmail && password === validPassword) {
            alert('Login Berhasil! Mengarahkan ke Homepage.');
            // halaman homepage
        } else {
            $('#login-global-error').removeClass('hidden');
        }
    });


    $('.password-toggle').on('click', function() {
        
        const $input = $(this).closest('.input-group').find('input[type="password"], input[type="text"]');
        
        const type = $input.attr('type') === 'password' ? 'text' : 'password';
        $input.attr('type', type);

        $(this).text(type === 'password' ? '👁️' : '🔒');
    });

});