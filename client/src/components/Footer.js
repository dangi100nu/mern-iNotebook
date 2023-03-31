import React from 'react';

function Footer() {
    return (
        <footer className='container-fluid text-center py-2'>
            <p className='mb-0'>www.iNotebook.com</p>
            <p className='mb-0'>Privacy Policy</p>
            <p className='mb-0 text-muted'>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved.</p>

        </footer>
    );
}

export default Footer;
