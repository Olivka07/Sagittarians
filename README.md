# Sagittarius

You can view it via the link: https://sagittarius-store.vercel.app/

Веб-приложение построено на клиент-серверной архитектуре, основные манипуляции с данными производятся с использованием СУБД PostgreSQL.
Клиент написан на языке TypeScript с адапативной вёрсткой, используется основной фреймворк React для создания пользовательского интерфейса, в качестве менеджера состояния был выбран Effector,
для взаимодействия с сервером используется Axios. Клиентская часть разработана по архитектуре Feature Sliced Design (FSD). Серверная часть написана на Express.

Приложение подразумевает 4 основные роли:
1. Неавторизованный пользователь;
2. Клиент;
3. Продавец;
4. Администратор.

# Неавторизованный пользователь.
Его основная функция - получение информации о продуктах: их наличие в магазине, цена, а также просмотр каталога имеющихся продуктов.
Каталог можно фильтровать по основным категориям, по названию товара, которое вводится в строку поиска над каталогом. 

На рисунке ниже представлен основной интерфейс, включающий каталог.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/4130984e-b650-43b6-94c0-3219ca6c7de4)

На данном рисунке представлен интерфейс неавторизованного пользователя при выборе продукта в каталоге.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/769126b1-7a88-4869-a479-5624186ce44d)

# Клиент.
Как и неавторизованный пользователь клиент может просматривать каталог, фильтровать его и просматривать основную информацию о продуктах.

На основном интерфейсе клиента изменяется шапка страницы. Добавляются пункты меню: "Корзина" и "Заказы".
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/7f450e1c-47d0-41c9-b9e1-ebfaee02c608)

Для добавления товара в корзину необходимо выбрать соответствующий продукт в каталоге и перейти на страницу с информацией о нём.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/4716745e-20d4-418b-8839-6920c805c718)

Для того, чтобы кнопка стала активной, необходимо ввести корректное значение количества товара. На следующих рисунках представлены исключительные ситуации
и корректный ввод. После нажатия кнопки "Положить в корзину" товар добавляется в виртуальную корзину и приходит уведомление об успешном действии.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/829ae1f8-5316-4627-980d-3ed748adf387)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/d15ad2ff-4ded-49f7-a77b-002dc47d2148)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/26fa931a-d778-4474-9c1c-ab9531b34fb3)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/d1b0c031-528e-4b1d-b67e-bbe5666079ce)

Выбрав пункт меню "Корзина" открывается страница с текущей виртуальной корзиной. Это список добавленных товаров с указанием количества товаров,
цены за это количество, название товара и картинка, привязанные к товару. Каждый элемент списка имеет кнопку "Убрать из корзины" для удаления
элемента из списка. Сверху над списком указывается общая сумма товаров, предполагаемого заказа, а также кнопки "Очистить корзину", которая очищает корзину и
"Сделать заказ" для оформления заказа, после которого изменяется количество выбранных товаров для заказа в каталоге.
В том случае, если у клиента уже имеется активный заказ, то система не добавляет собранную корзину в заказ и уведомляет
клиента о наличии неполученного заказа.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/70a71d07-da35-44a9-a63b-b99835399be6)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/4b3616f3-135c-4a17-8f3f-c56d8406a201)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/faa70962-faa6-4ae4-a9c4-dcd72b54fdcb)

Выбрав пункт меню "Заказы" клиент переходит на страницу с историей его заказов. Каждый заказ имеет статус:
ожидает, получен или отменён. В случае если заказ отменен отображается соответствующая причина отмены заказа
также каждый заказ имеет следующие метаданные: дата заказа и стоимость заказа. Заказ можно отменить или 
удалить из истории (при этом требуется подтверждение действия в модальном окне).
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/a80f0c6c-1eac-41a7-9679-064caf4ab9d6)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/73d799a9-96c5-47bc-917d-ea46058d6abe)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/8f3993e4-51bd-4c8f-9737-f8f5a6a9cf71)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/1cb69c76-bd9e-4071-b078-d32e1f3d1441)

Нажав на элемент списка заказов клиент переходит на страницу с описанием заказа. Она содержит метаданные
заказа, также статус и список товаров заказа.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/0ab7c70e-fa8f-4d89-b85a-691a296507bd)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/1cf5a604-2777-4690-9363-de2705194a82)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/b4bfaa98-1275-4b8e-8262-325f342a20a5)

# Продавец.
Основная функция продавца - просматривать заказы клиентов, редактировать свой график работы.

На основном интерфейсе продавца изменяется шапка страницы. Добавляются пункты меню: "Заказы" и "График" по сравнению с неавторизованным пользователем.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/11209d4c-41d9-4c35-bb71-fe0f0418561f)

Выбрав пункт меню "Заказы" продавец переходит на страницу с заказами, которые имеют время жизни до 3-х дней.
Если статус заказа "ожидает", то элемент списка содержит кнопку "Забрали", при нажатии на которую
статус заказа изменяется на получен.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/e7b15242-e710-41c8-bcae-de2aa4de6b07)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/bc20ae2e-b587-4e31-ab75-da06b3109a0c)

Выбрав элемент списка, продавец переходит на страницу, совпадающую по наполнению со страницей клиента определённого заказа.
За исключением того, что если заказ в статусе "Ожидает", продавцу отображается кнопка "Отменить" для отмены заказа.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/31144145-4fb4-4236-bd42-7dc395e20106)

Нажав на неё, продавцу открывается модальное окно для указания причины отказа заказа.
В выпадающем списке находятся товары, которые выбрал для заказа клиент, 
в нём продавцу необходимо выбрать что именно закончилось, чтобы указать причину отказа (доступен множественный выбор). После
отмены заказа количество соответствующих продуктов, выбранных в качестве причины, в каталоге становится равным 0, а 
остальные продукты заказа возвращают свое значение количества, если бы этого заказа не было.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/815242ba-4282-42e7-b057-2849ff1ea646)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/96a9b8ab-ea1d-4500-a917-ba376598ff6e)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/9830bd69-d834-49d0-9f19-69fb2b596a7c)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/311afdcd-669b-488b-994d-acd23dc65396)

Выбрав пункт меню "График" продавец может редактировать рабочий график по месяцам, используя технологи "Drag and Drop". 
Есть соответствующий элемент Data picker,
который позволяет выбрать определенный месяц, в зависимости от этого формируется календарная сетка.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/c3f9aad8-023c-4ba4-b566-cb4363908d42)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/096cd99e-c031-4afb-bcb5-ba3b24025e32)

Справа от сетки располагается корзина с именами всех сотрудников-продавцов. Откуда мы можем перемещать продавцов не сетку.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/e80a9987-9dca-42b7-847c-c62c23257a2b)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/ca0852cd-b457-443c-a1d9-d6a098582b95)

Система при переносе элемента на ячейку календаря проверяет наличие данного элемента в ячейке и 
не позволяет добавить продавца, если он там уже есть. При добавлении элементов, изменении времени рабочей смены
удалении элементов система уведомляет о существующих изменениях и напоминает пользователю о необходимости сохранить
расписание в базу данных, так кнопка "Сохранить" служит для выполнения этого действия, она становится активной при
наличии каких-то изменений. Также есть кнопка "Очистить всё", при нажатии на которую очищается полностью календарная сетка
выбранной даты. При наведении на элемент ячейки календарной сетки пользователю отображается время рабочей смены 
соответствующего продавца. В случае если рабочая смена не задана отображается "Пусто-Пусто". Для задания времени
необходимо дважды кликнуть на соответствующий элемент ячейки и откроется модальное окно с возможностью определении
этого времени. После нажатия кнопки "Сохранить" появляется уведомление об успешности действия и убираются 
предупреждающие уведомления.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/a82a1899-c07f-43ed-b1b2-943ea8c9d9d9)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/364843b5-bfa1-4b95-9c71-53f596147ee0)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/2c4ec3c2-8b34-4933-94b7-14d2e5ad349e)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/24aeb1ce-6e40-4221-9573-a3cb2ab5739c)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/a8bb5726-323a-4dca-94eb-28bca06adb3a)

# Администратор.
Основные функции администратора - работа с каталогом: заполнение, редактирование, работа со справочниками категорий и размерности товаров,
а также работа с продавцами: просмотр информации, создание учётной записи продавца, редактирование графика их работы.

На основном интерфейсе администратора изменяется шапка страницы. Добавляются пункты меню: "Продавцы" и "Справочники".
Рядом с каталогом отображается кнопка "+", при нажатии на которую открывается модальное окно для добавления нового товара
в каталог, также у каждого товара отображаются кнопки для удаления или изменения товара в каталоге.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/bf88fa55-4e73-40dd-9c51-73b11dc5fc6a)

Нажав кнопку "+" открывается модальное окно, в котором необходимо заполнить следующие метаданные о товаре:
название (текстовое поле), категория (выпадающий список со значениями из справочника категорий), 
цена (текстовое поле), размерность (единица товара - выпадающий список со значениями из справочника размерности),
количество товаров (текстовое поле) и необязательное поле - фото товара. В случае если не все требования выполнены,
кнопка "Добавить" остаётся недоступной для добавления товара.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/ed4869ae-30f1-43cf-98db-ee47b4fb3d1f)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/b913a58d-50fa-49b3-8817-776fb746ff32)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/835a55be-a44d-48f8-b039-28f03792ef31)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/01412eee-0d7b-4584-9512-e0a7545f0caa)

При редактировании открывается подобное модальное окно только с данными соответствующего товара.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/307c8ae4-3d38-40f7-a1a8-c051979c5123)

Для работы со справочниками необходимо выбрать пункт меню "Справочники". На странице представлены два справочника:
справочник "Категория" и справочник "Размерность". У каждого справочника имеются кнопки для добавления нового элемента
и сохранения справочника в базу данных - "Добавить" и "Сохранить" соответственно. Для редактирования элемента
необходимо нажать на элемент, тогда он преобразуется в текстовое поле, в которое можно вносить изменения.
Также каждый элемент содержит кнопку "Удалить", который удаляет элемент из справочника. При любом изменении
система формирует предупреждение для соответствующего справочника о наличии этих изменений и необходимости сохранения их в
базу данных. При добавлении или изменении название элемента выделяется красным шрифтом.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/9e511718-d91a-4b17-b826-d2d0812b1a2c)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/4f21165d-5a7a-4093-ba55-346bba4b7751)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/0e9be986-1c43-465b-9256-4492a5c081cd)

Выбрав пункт меню "Продавцы" администратор попадает на страницу для работы с продавцами, где у него имеются 2 вкладки:
"График" (по умолчанию активный) - для работы с рабочим графиком продавцов (идентична с функцией у продавца) и вкладка "Продавцы",
на которой администратор может просматривать метаданные о сотрудниках, а также удалять или регистрировать нового продавца, нажав кнопку
"Удалить" у соответствующего элемента и "Добавить" соответственно. При нажатии на кнопку "Добавить" открывается модальное окно с регистрационными полями
сотрудника: фамилия, имя, дата рождения, логин, пароль, подтверждение пароля и необязательное поле email.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/b31e3f33-29ae-4e0e-ad62-eb8c3ba1f7ae)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/308bfcfc-7154-4517-9103-135799deab49)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/69089a34-ab59-4d30-961b-ce2cd2582f8c)


На следующих рисунках представлен интерфейс авторизации пользователя и регистрации нового клиента.
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/919c1c90-026b-4284-b69a-bf7ef4aca41b)
![image](https://github.com/Olivka07/Sagittarians/assets/93726291/f19c0967-89b9-4b75-ad1a-107c807e2f47)

Вот так выглядит интерфейс главной страницы на телефоне:


![image](https://github.com/Olivka07/Sagittarians/assets/93726291/4ed2379d-450a-4dbc-8826-83b6a3b75f59)








































