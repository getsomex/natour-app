/* eslint-disable */
import '@babel/polyfill';

import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginform = document.querySelector('.form--login');
const logoutButton = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// VALUES

if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}
if (loginform) {
  document.querySelector('.form').addEventListener('submit', e => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    e.preventDefault();
    login(email, password);
  });
}
if (logoutButton) logoutButton.addEventListener('click', logout);
if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    updateSettings({ name, email }, 'data');
  });
if (userPasswordForm);
userPasswordForm.addEventListener('submit', async e => {
  e.preventDefault();
  document.querySelector('.btn--save-password').textContent = 'Updating...';
  const passwordCurrent = document.querySelector('#password-current').value;
  const password = document.querySelector('#password').value;
  const passwordConfirm = document.querySelector('#password-confirm').value;

  await updateSettings(
    { passwordCurrent, password, passwordConfirm },
    'password'
  );
  document.querySelector('.btn--save-password').textContent = 'Save Password';
});
