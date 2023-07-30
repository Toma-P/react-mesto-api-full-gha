import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import Auth from './Auth';

function Login({onAuthorization}) {
  return (
    <Auth name="login" title="Войти" onSubmit={onAuthorization} buttonText="Войти"/>
  )
}

export default Login;