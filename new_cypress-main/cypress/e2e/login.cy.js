import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверка цвет кнопки забыли пароль #005598
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');   //Проверка виден ли крестик пользователю.
        });

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);  //Ввел верный логин
         cy.get(main_page.password).type(data.password);   //Ввел верный пароль
         cy.get(main_page.login_button).click();  //нажал войти

         cy.get(result_page.title).contains('Авторизация прошла успешно');   //Проверка текста после автооризации.
         cy.get(result_page.title).should('be.visible');   //Проверка виден ли текст пользователю.
     })
     it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();  //нажал Забыли войти

        cy.get(recovery_page.email).type(data.login);  //Ввел верный логин
        cy.get(recovery_page.send_button).click();  //нажал отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');   //Проверка текста на совподение.
        cy.get(result_page.title).should('be.visible');   //Проверка виден ли текст пользователю.
    })
     it('Верный пароль и неверный логин', function () {
        cy.get(main_page.email).type(data.login);  //Ввел верный логин
        cy.get(main_page.password).type('111iLoveqastudio1');   //Ввел неверный пароль 
        cy.get(main_page.login_button).click();  //нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');   //Проверка текста после автооризации.
        cy.get(result_page.title).should('be.visible');   //Проверка виден ли текст пользователю.
    })
    it('Неверный пароль и верный логин', function () {
        cy.get(main_page.email).type('g1erman@dolnikov.ru');  //Ввел неверный логин
        cy.get(main_page.password).type(data.password);   //Ввел верный пароль
        cy.get(main_page.login_button).click();  //нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет');   //Проверка текста после автооризации.
        cy.get(result_page.title).should('be.visible');   //Проверка виден ли текст пользователю.
    })
    it('Ошибка валедации', function () {
        cy.get(main_page.email).type('germandolnikov.ru');  //Ввел логин с ошибкой в валедации
        cy.get(main_page.password).type(data.password);   //Ввел верный пароль
        cy.get(main_page.login_button).click();  //нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации');   //Проверка текста после автооризации.
        cy.get(result_page.title).should('be.visible');   //Проверка виден ли текст пользователю.
    })
    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');  //Ввел верный логин с заглавными буквами
        cy.get(main_page.password).type(data.password);   //Ввел верный пароль
        cy.get(main_page.login_button).click();  //нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно');   //Проверка текста после автооризации.
        cy.get(result_page.title).should('be.visible');   //Проверка виден ли текст пользователю.
    })
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 
