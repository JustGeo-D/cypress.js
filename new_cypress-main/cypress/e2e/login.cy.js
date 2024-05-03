describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/');  //Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверка цвет кнопки забыли пароль #005598

         cy.get('#mail').type('german@dolnikov.ru');  //Ввел верный логин
         cy.get('#pass').type('iLoveqastudio1');   //Ввел верный пароль
         cy.get('#loginButton').click();  //нажал войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно');   //Проверка текста после автооризации.
         cy.get('#messageHeader').should('be.visible');   //Проверка виден ли текст пользователю.
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');   //Проверка виден ли крестик пользователю.
     })
     it('Проверка логики восстановления пароля', function () {
        cy.visit('https://login.qa.studio/');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверка цвет кнопки забыли пароль #005598
        cy.get('#forgotEmailButton').click();  //нажал Забыли войти

        cy.get('#mailForgot').type('german@dolnikov.ru');  //Ввел верный логин
        cy.get('#restoreEmailButton').click();  //нажал отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');   //Проверка текста на совподение.
        cy.get('#messageHeader').should('be.visible');   //Проверка виден ли текст пользователю.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');   //Проверка виден ли крестик пользователю.
    })
     it('Верный пароль и неверный логин', function () {
        cy.visit('https://login.qa.studio/');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверка цвет кнопки забыли пароль #005598

        cy.get('#mail').type('german@dolnikov.ru');  //Ввел верный логин
        cy.get('#pass').type('111iLoveqastudio1');   //Ввел неверный пароль
        cy.get('#loginButton').click();  //нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');   //Проверка текста после автооризации.
        cy.get('#messageHeader').should('be.visible');   //Проверка виден ли текст пользователю.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');   //Проверка виден ли крестик пользователю.
    })
    it('Неверный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверка цвет кнопки забыли пароль #005598

        cy.get('#mail').type('g1erman@dolnikov.ru');  //Ввел неверный логин
        cy.get('#pass').type('iLoveqastudio1');   //Ввел верный пароль
        cy.get('#loginButton').click();  //нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет');   //Проверка текста после автооризации.
        cy.get('#messageHeader').should('be.visible');   //Проверка виден ли текст пользователю.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');   //Проверка виден ли крестик пользователю.
    })
    it('Ошибка валедации', function () {
        cy.visit('https://login.qa.studio/');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверка цвет кнопки забыли пароль #005598

        cy.get('#mail').type('germandolnikov.ru');  //Ввел логин с ошибкой в валедации
        cy.get('#pass').type('iLoveqastudio1');   //Ввел верный пароль
        cy.get('#loginButton').click();  //нажал войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');   //Проверка текста после автооризации.
        cy.get('#messageHeader').should('be.visible');   //Проверка виден ли текст пользователю.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');   //Проверка виден ли крестик пользователю.
    })
    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/');  //Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');  // Проверка цвет кнопки забыли пароль #005598

        cy.get('#mail').type('GerMan@Dolnikov.ru');  //Ввел верный логин с заглавными буквами
        cy.get('#pass').type('iLoveqastudio1');   //Ввел верный пароль
        cy.get('#loginButton').click();  //нажал войти

        cy.get('#messageHeader').contains('Авторизация прошла успешно');   //Проверка текста после автооризации.
        cy.get('#messageHeader').should('be.visible');   //Проверка виден ли текст пользователю.
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');   //Проверка виден ли крестик пользователю.
    })
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 